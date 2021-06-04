import './Home.css';
import React, { useState, useEffect } from 'react';
import { getPokemons } from '../../actions';
import { connect } from "react-redux";

export function Home(props) {
    const [name, setName] = useState("");
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    function handleChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(props);
        props.getPokemons();
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
            <ul>
                {
                    console.log(props.pokemons),
                    props.pokemons && props.pokemons.map(pokemon => (

                    ))

                }
            </ul>
        </div>
    )
}

function mapStatetoProps(state) {
    return {
        pokemons: state.pokemonsLoaded
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPokemons: name => dispatch(getPokemons(name))
    }
}

export default connect(
    mapStatetoProps,
    mapDispatchToProps
)(Home);