import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import './Home.css'
import { getPokemons, reloadPokemons, setPokemonsTypes } from '../../actions';
import Pokemon from '../Pokemon/Pokemon';

export function Home({ getPokemons, pokemonsViews, setPokemonsTypes, actualPage, loading, searchView, reloadPokemons }) {

    useEffect(() => {
        reloadPokemons();
        if (loading.pokemons) {
            getPokemons()
        }
    }, [getPokemons])

    useEffect(() => {
        if (loading.types) {
            setPokemonsTypes();
        }
    }, [setPokemonsTypes])

    return (
        <div className='pokemon-table'>
            {
                loading.search ? (
                    loading.error ? (<div>{loading.error}</div>) : (
                        searchView.length ? searchView.map(pokemon => (
                            <Pokemon
                                id={pokemon.id}
                                name={pokemon.name}
                                image={pokemon.image}
                                types={pokemon.Types}
                            />
                        )) : (<div className='loading'>Loading...</div>)
                    )
                ) : (
                    loading.pokemons ? (<div className='loading'>Loading...</div>) : (
                        loading.error ? (<div>{loading.error}</div>) : (
                            pokemonsViews.length ? pokemonsViews[actualPage].map(pokemon => (
                                <Pokemon
                                    id={pokemon.id}
                                    name={pokemon.name}
                                    image={pokemon.image}
                                    types={pokemon.Types}
                                />
                            )) : (<div className='loading'>Loading...</div>)
                        )
                    )
                )
            }
        </div>
    )
}

function mapStatetoProps(state) {
    return {
        actualPage: state.actualPage,
        pokemonsViews: state.pokemonsViews,
        searchView: state.searchView,
        loading: state.loading,
        error: state.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPokemons: () => dispatch(getPokemons()),
        setPokemonsTypes: () => dispatch(setPokemonsTypes()),
        reloadPokemons: () => dispatch(reloadPokemons())
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Home);
