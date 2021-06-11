import React from 'react';
import { NavLink } from 'react-router-dom';
import './Pokemon.css';

export default function Pokemon({ id, name, image, types }) {
    return (
        <NavLink className="link" exact to={`/home/${id}`}>
            <div className="pokemon-container">
                <img src={image} alt="not found"></img>
                <div>{name}</div>
                <span>Tipo: </span>
                {
                    types && types.map((type, index) => (
                        <span key={index}>{type.type.name}</span>
                    ))
                }
            </div>
        </NavLink>
    )
}
