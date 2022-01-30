import React, { MouseEvent } from "react";

interface Props {
  onStrokeStart: () => void;
  onStrokeMove: (x: number, y: number, force: number) => void;
  onStrokeEnd: () => void;
}

class CanvasController extends React.Component<Props> {
  mouseForce = 0.5;
  penGrounded = false;
  canvasController!: React.RefObject<HTMLDivElement>;

  touchScreenDevice: boolean = false;

  constructor(props: Props) {
    super(props);
    this.canvasController = React.createRef<HTMLDivElement>();

    const ua = window.navigator.userAgent.toLowerCase();
    if(ua.indexOf('ipad') > -1 || ua.indexOf('macintosh') > -1 && 'ontouchend' in document) {
      this.touchScreenDevice = true;
    }
  }

  componentDidMount() {
    this.canvasController.current?.addEventListener(
      "touchmove",
      this.stopScroll,
      { passive: false }
    );
  }

  stopScroll = (event: TouchEvent) => event.preventDefault();

  handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    // 主ボタンのクリック時しか反応させない
    if(!this.touchScreenDevice && event.button === 0) {
      const position = this.getCanvasPositionFromClientPosition(event.clientX, event.clientY);
      // ペンを接地状態にする
      this.penGrounded = true;
      this.props.onStrokeStart();
      this.props.onStrokeMove(position.x, position.y, this.mouseForce)
    }
  }

  handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if(!this.touchScreenDevice && event.button === 0 && this.penGrounded) {
      const position = this.getCanvasPositionFromClientPosition(event.clientX, event.clientY);
      this.props.onStrokeMove(position.x, position.y, this.mouseForce);
    }
  }

  handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
    // 主ボタンのクリック時しか反応させない
    if(!this.touchScreenDevice && event.button === 0) {
      const position = this.getCanvasPositionFromClientPosition(event.clientX, event.clientY);
      // ペンの接地状態を解除
      this.penGrounded = false;
      this.props.onStrokeMove(position.x, position.y, this.mouseForce);
      this.props.onStrokeEnd();
    }
  }

  handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch: any = event.changedTouches[0];

    if (touch.touchType === "direct") {
      this.canvasController.current?.removeEventListener(
        "touchmove",
        this.stopScroll
      );
      return;
    }

    const position = this.getCanvasPositionFromClientPosition(
      touch.clientX,
      touch.clientY
    );
    this.props.onStrokeStart();
    this.props.onStrokeMove(position.x, position.y, touch.force / 2);
  };

  handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch: any = event.changedTouches[0];

    if (touch.touchType === "direct") {
      this.canvasController.current?.removeEventListener(
        "touchmove",
        this.stopScroll
      );
      return;
    } else if (touch.touchType === "stylus") {
      this.canvasController.current?.addEventListener(
        "touchmove",
        this.stopScroll,
        { passive: false }
      );
    }

    const position = this.getCanvasPositionFromClientPosition(
      touch.clientX,
      touch.clientY
    );
    this.props.onStrokeMove(position.x, position.y, touch.force);
  };

  handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch: any = event.changedTouches[0];

    this.canvasController.current?.addEventListener(
      "touchmove",
      this.stopScroll,
      { passive: false }
    );
    if (touch.touchType === "direct") return;

    const position = this.getCanvasPositionFromClientPosition(
      touch.clientX,
      touch.clientY
    );
    this.props.onStrokeMove(position.x, position.y, touch.force);
    this.props.onStrokeEnd();
  };

  getCanvasPositionFromClientPosition = (x: number, y: number) => {
    return {
      x: ~~(x + window.pageXOffset),
      y: ~~(y + window.pageYOffset)
    };
  };

  shouldComponentUpdate = () => false;

  render() {
    return (
      <div
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        ref={this.canvasController}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        className={"canvas-controller"}
      />
    );
  }
}

export default CanvasController;
