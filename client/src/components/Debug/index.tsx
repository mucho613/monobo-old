import { useRecoilValue } from 'recoil';
import { debugState } from '../../state';
import './css/Debug.css';

function Debug() {
  return (
    <div className="debug-window">
      <h2>Debug Info</h2>
      <p>
        {useRecoilValue(debugState)}
      </p>
    </div>
  );
}

export default Debug;
