import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { getPokemons } from '../../actions';
import Pokemon from '../Pokemon/Pokemon';

export function Home({ getPokemons, pokemonsLoaded, pokemonsViews, actualPage }) {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPokemons()
    }, [getPokemons])

    useEffect(() => {
        (async () => {
            await setPokemons(pokemonsViews[actualPage])
            setLoading(false)
        })()
        console.log(pokemonsViews[0])
    }, [actualPage])

    return (
        <div>
            {
                loading ? (<div>Cargando...</div>) : (
                    pokemons ? pokemons.map(pokemon => (
                        <Pokemon
                            id={pokemon.id}
                            name={pokemon.name}
                            image={pokemon.image}
                            types={pokemon.types}
                            stats={pokemon.stats}
                            height={pokemon.height}
                            weight={pokemon.weight}
                        />
                    )) : (<div>Cargando...</div>)
                )
            }
        </div>
    )
}

function mapStatetoProps(state) {
    return {
        pokemonsLoaded: state.pokemonsLoaded,
        actualPage: state.actualPage,
        pokemonsViews: state.pokemonsViews,
        error: state.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPokemons: () => dispatch(getPokemons())
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Home);
