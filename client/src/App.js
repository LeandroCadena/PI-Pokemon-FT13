import './App.css';
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom'
import Login from './components/Login/Login';
import Home from './components/Home/Home';

function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={Login} />
      <Route path="/home" component={Home}></Route>
    </React.Fragment>
  );
}
// <div className="App">
//   <Route></Route>
//   <h1>Henry Pokemon</h1>
// </div>

export default App;
