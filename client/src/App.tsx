import './css/App.css';
import DrawingChat from './components/DrawingChat';
import {
  RecoilRoot
} from 'recoil';


function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <DrawingChat></DrawingChat>
      </div>
    </RecoilRoot>
  );
}

export default App;
