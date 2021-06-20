import React, { useEffect, useState } from 'react'
import { getPokemonDetail } from '../../controllers/Pokemons'
import './Detail.css'

export default function Detail(props) {
    const [detail, setDetail] = useState();

    useEffect(() => {
        const id = props.match.params.id;

        (async () => {
            const detail = await getPokemonDetail(id)
            setDetail(detail.data[0])
        })()
    }, [])

    useEffect(() => {
        console.log(detail)
    }, [detail])

    return (
        <div className='container'>
            {
                detail ? (
                    <div className='pokemon-card'>
                        <div className={`pokemon-book unset ${detail.Types.map(type => { return type.name }).join(" ")}`}>
                            <div className={`card-header Tunset ${detail.Types.map(type => { return "T" + type.name }).join(" ")}`}>
                                <h1>{detail.name}</h1>
                                <img className='pokemon-image' src={detail.image}></img>
                                <p className='pokemon-id'>{`Pokemon ID: ${detail.id}`}</p>
                            </div>
                            <div className='card-content'>
                                <p>{`💪 Attack: ${detail.attack}`}</p>
                                <p>{`🛡️ Defense: ${detail.defense}`}</p>
                                <p>{`❤️ HP: ${detail.hp}`}</p>
                                <p>{`💨 Speed: ${detail.speed}`}</p>
                                <p>{`📏 Height: ${detail.height}`}</p>
                                <p>{`⚖️ Weight: ${detail.weight}`}</p>
                                <p>{`🔥 Types: `}
                                    {
                                        detail.Types && detail.Types.map((type, index) => (
                                            <span className='type' key={index}>{type.name}</span>
                                        ))
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (<div className='loading'>Loading...</div>)
            }
        </div >
    )
}