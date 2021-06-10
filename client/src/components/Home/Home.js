import './Home.css';
import React, { useState, useEffect } from 'react';
import { getPokemons } from '../../actions';
import { connect } from "react-redux";
import Pokemon from '../Pokemon/Pokemon';

export function Home({ getPokemons, pokemonDetail, pokemonsLoaded }) {
    const [name, setName] = useState("");
    const [page, setPage] = useState("https://pokeapi.co/api/v2/pokemon");
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    function handleChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name !== "") {
            fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
                .then(response => response.json())
                .then(data => {
                    setFilteredPokemons([{
                        index: data.id,
                        name: data.name,
                        img: data.sprites.front_default,
                        types: data.types
                    }])
                })
                .catch(error => {
                    setFilteredPokemons([{
                        index: 5,
                        name: "Pokemon No encontrado",
                        img: "https://cdn3.josefacchin.com/wp-content/uploads/2018/09/http-not-found-error-404.png",
                        types: [3,5]
                    }])
                })
        }
    }

    useEffect(() => {
        if (name === "") {
            getPokemons(page)
        }
    }, [name])

    useEffect(() => {
        if (name === "") {
            getPokemons(page)
        }
        getPokemons(page)
    }, [page])

    useEffect(() => {
        setFilteredPokemons(pokemonsLoaded)
    }, [pokemonsLoaded])

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
                <button onClick={() => setPage(pokemonDetail.previous)}>Anterior</button>
                <button onClick={() => setPage(pokemonDetail.next)}>Siguiente</button>
            </form>
            <ul>
                {
                    filteredPokemons && filteredPokemons.map((pokemon, index) => (
                        <Pokemon
                            key={index}
                            id={pokemon.index}
                            name={pokemon.name}
                            image={pokemon.img}
                            types={pokemon.types}
                        />
                    ))
                }
                {
                    !filteredPokemons && (<h3>NO</h3>)
                }
            </ul>
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

export default connect(
    mapStatetoProps,
    mapDispatchToProps
)(Home);