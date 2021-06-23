import React, { useEffect } from 'react'
import { connect } from "react-redux";
import './Home.css'
import { getPokemons, reloadPokemons, setPokemonsTypes } from '../../actions';
import Pokemon from '../Pokemon/Pokemon';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';

export function Home({ getPokemons, pokemonsViews, setPokemonsTypes, actualPage, loading, searchView, reloadPokemons }) {

    useEffect(() => {
        reloadPokemons();
        if (loading.pokemons) {
            getPokemons()
        }
    }, [getPokemons, loading.pokemons, reloadPokemons])

    useEffect(() => {
        if (loading.types) {
            setPokemonsTypes();
        }
    }, [setPokemonsTypes, loading.types])

    return (
        <div className='pokemon-table'>
            {
                loading.search ? (
                    loading.error ? (<Error error={loading.error} />) : (
                        searchView.length ? searchView.map((pokemon, index) => (
                            <Pokemon
                                key={index}
                                id={pokemon.id}
                                name={pokemon.name}
                                image={pokemon.image}
                                types={pokemon.Types}
                            />
                        )) : (<Loading />)
                    )
                ) : (
                    loading.pokemons ? (<Loading />) : (
                        loading.error ? (<Error error={loading.error} />) : (
                            pokemonsViews[0].length ? pokemonsViews[actualPage].map((pokemon, index) => (
                                <Pokemon
                                    key={index}
                                    id={pokemon.id}
                                    name={pokemon.name}
                                    image={pokemon.image}
                                    types={pokemon.Types}
                                />
                            )) : (<Loading />)
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
