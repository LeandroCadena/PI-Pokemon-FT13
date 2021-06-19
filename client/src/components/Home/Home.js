import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import './Home.css'
import { getPokemons, setPokemonsTypes } from '../../actions';
import Pokemon from '../Pokemon/Pokemon';

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
        <div className='pokemon-table'>
            {
                loading.pokemons ? (<div className='loading'>Loading...</div>) : (
                    pokemons ? pokemons.map(pokemon => (
                        <Pokemon
                            id={pokemon.id}
                            name={pokemon.name}
                            image={pokemon.image}
                            types={pokemon.Types}
                        />
                    )) : (<div className='loading'>Loading...</div>)
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
