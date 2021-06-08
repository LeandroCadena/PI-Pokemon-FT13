import React from 'react'

export default function Pokemon({ id, name, image, type }) {
    return (
        <div>
            <img src={image}></img>

        </div>
    )
}
