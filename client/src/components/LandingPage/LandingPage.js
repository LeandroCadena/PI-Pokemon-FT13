import React from 'react';
import './LandingPage.css';
import { NavLink } from 'react-router-dom';

export default function Login() {
    return (
        <div className="login-container">
            <div className="login">
                <img className="pokeball" src="https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png" alt='loading'></img>
                <h3>Pokemon App</h3>
                <NavLink exact to={"/home"} className="link"><span className="button">Ingresar</span></NavLink>
            </div>
        </div>
    )
}
