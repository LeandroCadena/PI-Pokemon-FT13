import './Home.css';
import React, { useState, useEffect } from 'react';
import { getPokemons } from '../../actions';
import { connect } from "react-redux";

export function Home(props) {
    const [name, setName] = useState("");
    const [page, setPage] = useState("https://pokeapi.co/api/v2/pokemon");
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    function handleChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setFilteredPokemons(props.pokemonsLoaded)
        console.log(filteredPokemons)   
    }

    useEffect(() => {
        props.getPokemons(page);
    }, [])

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
                        <div>{pokemon.name}</div>
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