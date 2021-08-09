import React, { useRef, useState } from 'react'
import './css/CanvasControlSurface.css';

export type ControlType =
  'MouseDown' |
  'MouseMove' |
  'MouseUp' |
  'FingerTouchDown' |
  'FingerTouchMove' |
  'FingerTouchUp';

type CanvasControlSurfaceProps = {
  onControl: (controlType: ControlType, x: number, y: number, force: number) => void;
}

function CanvasControlSurface(props: CanvasControlSurfaceProps) {
  const canvasControlSurfaceRef = useRef<HTMLDivElement>(null);
  const [penGrounded, setPenGrounded] = useState<boolean>(false);
  const mouseForce = 0.5;

  const stopScroll = (event: React.TouchEvent<HTMLDivElement>) => event.preventDefault();

  const handleMouseDown = (event: React.MouseEvent) => {
    if(event.button === 0) {
      const position = getCanvasPositionFromClientPosition(event.clientX, event.clientY);
      setPenGrounded(true);
      props.onControl('MouseDown', position.x, position.y, mouseForce);
    }
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    if(event.button === 0 && penGrounded) {
      const position = getCanvasPositionFromClientPosition(event.clientX, event.clientY);
      props.onControl('MouseMove', position.x, position.y, mouseForce);
    }
  }

  const handleMouseUp = (event: React.MouseEvent) => {
    if(event.button === 0) {
      const position = getCanvasPositionFromClientPosition(event.clientX, event.clientY);
      setPenGrounded(false);
      props.onControl('MouseUp', position.x, position.y, mouseForce);
    }
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch: any = event.changedTouches[0];
    if (touch.touchType === 'direct') {
      canvasControlSurfaceRef.current?.removeEventListener(
        'touchmove',
        () => stopScroll(event)
      );
      return;
    }
    const position = getCanvasPositionFromClientPosition(
      touch.clientX,
      touch.clientY
    );
    props.onControl('MouseDown', position.x, position.y, touch.force / 2);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch: any = event.changedTouches[0];
    if (touch.touchType === 'direct') {
     canvasControlSurfaceRef.current?.removeEventListener(
        'touchmove',
        () => stopScroll(event)
      );
      return;
    } else if (touch.touchType === 'stylus') {
     canvasControlSurfaceRef.current?.addEventListener(
        'touchmove',
        () => stopScroll(event),
        { passive: false }
      );
    }
    const position = getCanvasPositionFromClientPosition(
      touch.clientX,
      touch.clientY
    );
    props.onControl('MouseMove', position.x, position.y, touch.force);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch: any = event.changedTouches[0];
    canvasControlSurfaceRef.current?.addEventListener(
      'touchmove',
      () => stopScroll(event),
      { passive: false }
    );
    if (touch.touchType === 'direct') return;
    const position = getCanvasPositionFromClientPosition(
      touch.clientX,
      touch.clientY
    );
    props.onControl('MouseUp', position.x, position.y, touch.force);
  };

  const getCanvasPositionFromClientPosition = (x: number, y: number) => {
    return {
      x: ~~(x + window.pageXOffset),
      y: ~~(y + window.pageYOffset)
    };
  };

  return (
    <div
      className='canvas-control-surface'
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={canvasControlSurfaceRef}
    ></div>
  );
}

export default CanvasControlSurface;

