import React from 'react';
import {Switch, Route} from "react-router-dom"
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './views/Home/Home'
import AppBar from './components/Sidebar/Sidebar'
import Estadisticas from './views/Estadisticas/Estadisticas';
import Players from './views/Players/Players';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <AppBar />
      <Switch>
        <Route exact path="/" render={props=> <Home {...props}/>} />
        <Route exact path="/stadistics" render={props=> <Estadisticas {...props}/>} />
        <Route exact path="/players" render={props=> <Players {...props}/>} />
      </Switch>
        
      
      
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
