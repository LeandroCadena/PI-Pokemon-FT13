import React from 'react'

export default function Pokemon({ id, name, image, types }) {
    return (
        <div>
            <img src={image}></img>
            <div>{name}</div>
            <span>Tipo: </span>
            {
                types && types.map(type => (
                    <span>{type.type.name}</span>
                ))
            }
        </div>
    )
}
