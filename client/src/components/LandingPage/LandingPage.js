import React from 'react';
import './LandingPage.css';
import { NavLink } from 'react-router-dom';
import { POKEBALL_IMAGE } from '../../utils/constants'
import Charizard from '../../img/Charizard.png'

export default function Login() {
    return (
        <div className="login-container">
            <div className='background'>
                <img className='Charizard invert' src={Charizard} alt='background'></img>
                <img className='Charizard' src={Charizard} alt='background'></img>
            </div>
            <div className='login-pokeball'>
                <img className="pokeball login" src={POKEBALL_IMAGE}/>
            </div>
            <div className="login">
                <NavLink exact to={"/home"} className="link"><span className="button">ENTER</span></NavLink>
            </div>
        </div >
    )
}
