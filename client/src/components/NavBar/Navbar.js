import React, { useState } from 'react'
import './NavBar.css'
import { POKEBALL_IMAGE, SEARCH_ICON } from '../../utils/constants'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { searchPokemon } from '../../actions';

export function Navbar({ searchPokemon }) {
    const [name, setName] = useState('');

    const handleChange = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        searchPokemon('bulbasaur');
        console.log('hola')
    }

    return (
        <div className='NavBar'>
            <div className='searchBar'>
                <NavLink className='addButton' to='/home'>
                    <img className='logo' src={POKEBALL_IMAGE}></img>
                    HOME
                </NavLink>
                <NavLink className='addButton' to='/add'>
                    <img className='logo' src={POKEBALL_IMAGE}></img>
                    CREATE
                </NavLink>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className='searchBar'>
                <span>SEARCH</span>
                <input
                    value={name}
                    type='text'
                    onChange={e => handleChange(e)}
                    placeholder='Pokemon...'
                ></input>
                <button className='btnSubmit' type='submit'>
                    <img className='searchIcon' src={SEARCH_ICON}></img>
                </button>
            </form>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        searchPokemon: (name) => dispatch(searchPokemon(name))
    }
}

export default connect(null, mapDispatchToProps)(Navbar);
