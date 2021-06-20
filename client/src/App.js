import './App.css';
import React from 'react';
import { Route } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Paginate from './components/Paginate/Paginate';
import AddPokemon from './components/AddPokemon/AddPokemon';
import Navbar from './components/NavBar/Navbar';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={Navbar} />
      <Route exact path="/home" component={Paginate} />
      <Route exact path="/home" component={Home} />
      <Route path="/add" component={AddPokemon} />
      <Route path="/home/pokemon/:id" component={Detail}  />
    </React.Fragment>
  );
}

export default App;
