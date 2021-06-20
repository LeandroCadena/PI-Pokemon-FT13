import React from 'react'
import './NavBar.css'
import { POKEBALL_IMAGE, SEARCH_ICON } from '../../utils/constants'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
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
            <div className='searchBar'>
                <span>SEARCH</span>
                <input placeholder='Pokemon...'></input>
                <img className='searchIcon' src={SEARCH_ICON}></img>
            </div>
        </div>
    )
}
