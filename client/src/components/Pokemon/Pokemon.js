import React from 'react';
import { NavLink } from 'react-router-dom';
import './Pokemon.css';

export default function Pokemon({ id, name, image, types }) {

    const color = types.map(type => {
        return type.name
    }).join(" ")

    return (
        <NavLink className="link" exact to={`/home/pokemon/${id}`}>
            <div className={`pokemon-container`}>
                <div className='unset inner-container'>
                    <img className={`pokemon-home-image ${color}`} src={image} alt='loading'></img>
                    <div className='name'>{name}</div>
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
