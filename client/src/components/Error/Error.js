import React from 'react'
import './Error.css';

export default function Error({ error }) {
    return (
        <div className='loading-container'>
            <img className='error-giff' src='https://33.media.tumblr.com/ad1f890fb89757f40dfd5fde97ea26fc/tumblr_mxwv73ktBI1scncwdo1_500.gif'></img>
            <div className='error-text'>{`We're sorry: ${error}`}</div>
        </div>
    )
}
