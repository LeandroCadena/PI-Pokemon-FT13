import React from 'react'
import './Loading.css'

export default function Loading() {
    return (
        <div className='loading-container'>
            <img className='loading-giff' src='https://media2.giphy.com/media/IQebREsGFRXmo/giphy.gif'></img>
            <div className='loading'>Loading...</div>
        </div>
    )
}
