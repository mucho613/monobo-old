import { useState } from 'react';
import Canvas from './Canvas';
import CanvasControlSurface, { ControlType } from './CanvasControlSurface';

function DrawingChat() {
  const [stroke, setStroke] = useState<any>([]);

  const handleControl = (controlType: ControlType, x: number, y: number, force: number) => {
    switch(controlType) {
      case 'MouseDown':
        setStroke([{ x, y }]);
        break;
      case 'MouseMove':
        setStroke(
          stroke.concat([{ x, y }])
        );
        break;
      case 'MouseUp':
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
