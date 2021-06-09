import './Home.css';
import React, { useState, useEffect } from 'react';
import { getPokemons } from '../../actions';
import { connect } from "react-redux";
import Pokemon from '../Pokemon/Pokemon';

export function Home(props) {
    const [name, setName] = useState("");
    const [page, setPage] = useState("https://pokeapi.co/api/v2/pokemon");
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    function handleChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    useEffect(() => {
        props.getPokemons(page)
    }, [])

    useEffect(() => {
        setFilteredPokemons(props.pokemonsLoaded)
    }, [props.pokemonsLoaded])

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
            <ul>
                {
                    filteredPokemons && filteredPokemons.map(pokemon => (
                        <Pokemon
                            id={pokemon.index}
                            name={pokemon.name}
                            image={pokemon.img}
                            types={pokemon.types}
                        />
                    ))
                }
            </ul>
        </div>
    )
}

function mapStatetoProps(state) {
    return {
        pokemonsLoaded: state.pokemonsLoaded
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPokemons: page => dispatch(getPokemons(page))
    }
}

export default connect(
    mapStatetoProps,
    mapDispatchToProps
)(Home);