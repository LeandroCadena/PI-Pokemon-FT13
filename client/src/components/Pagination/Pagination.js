import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { getPokemons, searchPokemon } from '../../actions';
import Pokedex from '../Pokedex/Pokedex';

export function Pagination({ getPokemons, pokemonDetail, searchPokemon }) {
    const [page, setPage] = useState("https://pokeapi.co/api/v2/pokemon");
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");

    useEffect(() => {
        (async () => {
            setLoading(true)
            if (page) await getPokemons(page)
            setLoading(false)
        })()
    }, [page])


    function handleChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        (async () => {
            setLoading(true)
            if (name) await searchPokemon(name)
            setLoading(false)
        })()
    }

    return (
        <div>
            <h2>Busca a tu pokemon</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input
                        value={name}
                        onChange={e => handleChange(e)}
                    />
                </div>
                <button type="submit">BUSCAR</button>
            </form>
            <div>
                <button onClick={() => setPage(pokemonDetail.previous)}>Anterior</button>
                <button onClick={() => setPage(pokemonDetail.next)}>Siguiente</button>
            </div>
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
        getPokemons: page => dispatch(getPokemons(page)),
        searchPokemon: name => dispatch(searchPokemon(name))
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Pagination);
