import React from 'react'

export default function Pokemon({ id, name, image, types }) {
    return (
        <div>
            <img src={image} alt="not found"></img>
            <div>{name}</div>
            <span>Tipo: </span>
            {
                types && types.map((type, index) => (
                    <span key={index}>{type.type.name}</span>
                ))
            }
        </div>
    )
}
