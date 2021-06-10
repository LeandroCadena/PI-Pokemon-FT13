import React from 'react';
import './Login.css';
import { NavLink } from 'react-router-dom';

export default function Login() {
    return (
        <div class="container">
            <div class="login">
                <img class="pokeball" src="https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png" alt="not found"></img>
                <h3>Pokemon App</h3>
                <NavLink exact to="/home" class="link"><span class="button">Ingresar</span></NavLink>
            </div>
        </div>
    )
}
