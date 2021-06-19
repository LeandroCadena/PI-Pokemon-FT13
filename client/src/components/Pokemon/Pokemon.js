import React from 'react';
import { NavLink } from 'react-router-dom';
import './Pokemon.css';

export default function Pokemon({ id, name, image, types }) {

    const color = types.map(type => {
        return type.name
    }).join(" ")

    return (
        <NavLink className="link" exact to={`/home/api/${id}`}>
            <div className={`${color} pokemon-container`}>
                <img src={image} alt="not found"></img>
                <div>{name}</div>
                <span>Tipo: </span>
                {
                    types && types.map((type, index) => (
                        <span key={index}>{type.name}</span>
                    ))
                }
            </div>
        </NavLink>
    )
}
