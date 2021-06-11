import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { getPokemons } from '../../actions';
import Pokedex from '../Pokedex/Pokedex';

export function Pagination({ getPokemons, pokemonsLoaded }) {
    const [page, setPage] = useState("https://pokeapi.co/api/v2/pokemon");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await getPokemons(page)
            setLoading(false)
        })()
    }, [page])

    return (
        <div>
            {
                loading ? (<div>Cargando pokemons...</div>) : (
                    <Pokedex />
                )
            }
        </div>
    )
}

function mapStatetoProps(state) {
    return {
        pokemonsLoaded: state.pokemonsLoaded,
        pokemonDetail: state.pokemonDetail
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPokemons: page => dispatch(getPokemons(page))
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(Pagination);
