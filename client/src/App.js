import './App.css';
import React from 'react';
import { Route } from 'react-router-dom'
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={Home}></Route>
      <Route exact path="/home/api/:id" component={Detail}></Route>
    </React.Fragment>
  );
}

export default App;
