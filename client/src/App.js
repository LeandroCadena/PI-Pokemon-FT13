import './App.css';
import React from 'react';
import { Route } from 'react-router-dom'
import Login from './components/Login/Login';
import Home from './components/Home/Home';

function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={Home}></Route>
    </React.Fragment>
  );
}

export default App;
