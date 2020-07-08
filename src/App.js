import React from 'react';
import logo from './logo.svg';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from './components/Sidebar/Sidebar'

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <AppBar />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
