import React, { useEffect, useRef } from 'react';
import './css/Canvas.css';

type CanvasProps = {
  stroke: any[];
}

function Canvas(props: CanvasProps) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const context = getContext();
    props.stroke.forEach((point: {x: number, y: number}, index: number) => {
      if(index !== 0) {
        context.lineTo(point.x, point.y);
        context.stroke();
      }
      if(index !== props.stroke.length - 1) {
        context.beginPath();
        context.moveTo(point.x, point.y);
      }
    })
  });

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;
    return canvas.getContext('2d');
  }

  return (
    <div className="canvas-container">
      {/* Local echo image */}
      <canvas ref={canvasRef} width={2048} height={2048} />

      {/* In history queue drawings image */}

      {/* Destination layer image */}
    </div>
  );
}

export default Canvas
