import logo from './logo.svg';
import './App.css';
import Sachie from './Sachie';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Sachie/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Livre Journal! :)
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
