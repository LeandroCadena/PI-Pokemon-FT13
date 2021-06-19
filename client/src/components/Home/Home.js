import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { getPokemons } from '../../actions';
import Pokemon from '../Pokemon/Pokemon';
import { NavLink } from 'react-router-dom'
import { setPokemonsTypes } from '../../actions'

export function Home({ getPokemons, pokemonsViews, actualPage }) {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true)
            await getPokemons()
            setLoading(false)
        })()
    }, [getPokemons])

    useEffect(() => {
        setPokemonsTypes();
    }, [setPokemonsTypes])

    useEffect(() => {
        setPokemons(pokemonsViews[actualPage])
    }, [actualPage])

    return (
        <div>
            <NavLink to='/add'>
                Create a new pokemon
            </NavLink>
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
