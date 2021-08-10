import './css/App.css';
import DrawingChat from './components/DrawingChat';
import {
  RecoilRoot
} from 'recoil';
import logo from './img/logo.svg';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
      <img src={logo} className="monobo-logo" alt="monobo Drawing chat system" />
        <DrawingChat></DrawingChat>
      </div>
    </RecoilRoot>
  );
}

export default App;
