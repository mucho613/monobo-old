import { useState } from 'react';
import Canvas from './Canvas';
import CanvasControlSurface, { ControlType } from './CanvasControlSurface';
import firebase from 'firebase';

function DrawingChat() {
  const [stroke, setStroke] = useState<{ x: number, y: number }[]>([]);
  const [latestStrokeRef, setLatestStrokeRef] = useState<any>(null);

  const handleControl = (controlType: ControlType, x: number, y: number, force: number) => {
    const drawingsRef = firebase.database().ref('drawings');
    drawingsRef.on('child_added', (data) => {
      setStroke(data.val());
    });

    switch(controlType) {
      case 'MouseDown':
        setStroke([{ x, y }]);
        const drawingsRef = firebase.database().ref('drawings');
        setLatestStrokeRef(drawingsRef.push());
        break;
      case 'MouseMove':
        setStroke(
          stroke.concat([{ x, y }])
        );
        break;
      case 'MouseUp':
        latestStrokeRef.set(stroke);
        setStroke(
          stroke.concat([{ x, y }])
        );
        break;
    }
  }

  return (
    <>
      <CanvasControlSurface
        onControl={handleControl}
      />
      <Canvas
        stroke={stroke}
      />
    </>
  );
}

export default DrawingChat;
