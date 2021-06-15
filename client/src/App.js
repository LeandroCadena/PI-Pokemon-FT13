import './App.css';
import React from 'react';
import { Route } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Paginate from './components/Paginate/Paginate';

function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={Paginate}></Route>
      <Route path="/home" component={Home}></Route>
    </React.Fragment>
  );
}

export default App;
