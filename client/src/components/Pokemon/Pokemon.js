import React from 'react';
import { NavLink } from 'react-router-dom';
import './Pokemon.css';

export default function Pokemon({ id, name, image, types }) {

    const color = types.map(type => {
        return type.name
    }).join(" ")

    return (
        <NavLink className="link" exact to={`/home/pokemon/${id}`}>
            <div className={`${color} unset pokemon-container`}>
                <div className='inner-container'>
                    <img className='pokemon-home-image' src={image} alt="not found"></img>
                    <div>{name}</div>
                    <span>Types: </span>
                    {
                        types && types.map((type, index) => (
                            <span className='type' key={index}>{type.name}</span>
                        ))
                    }
                </div>
            </div>
        </NavLink>
    )
}
