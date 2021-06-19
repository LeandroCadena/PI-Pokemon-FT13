import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { getPokemons, setPokemonsTypes } from '../../actions';
import Pokemon from '../Pokemon/Pokemon';
import { NavLink } from 'react-router-dom'

export function Home({ getPokemons, pokemonsViews, setPokemonsTypes, actualPage, loading }) {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        if (loading.pokemons) {
            getPokemons()
        }
    }, [getPokemons])

    useEffect(() => {
        if (loading.types) {
            setPokemonsTypes();
        }
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
                loading.pokemons ? (<div>Cargando...</div>) : (
                    pokemons ? pokemons.map(pokemon => (
                        <Pokemon
                            id={pokemon.id}
                            name={pokemon.name}
                            image={pokemon.image}
                            types={pokemon.Types}
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
        loading: state.loading,
        error: state.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPokemons: () => dispatch(getPokemons()),
        setPokemonsTypes: () => dispatch(setPokemonsTypes())
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Home);
