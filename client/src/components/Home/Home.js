import './Home.css';
import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { getPokemons, searchPokemon } from '../../actions';
import Pokemon from '../Pokemon/Pokemon';

export function Home({ getPokemons, searchPokemon, pokemonsLoaded, pokemonDetail, error }) {
    const [page, setPage] = useState("https://pokeapi.co/api/v2/pokemon");
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [sortedPokemons, setSortedPokemons] = useState(false);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");

    useEffect(() => {
        if (page) {
            (async () => {
                setLoading(true)
                await getPokemons(page)
                setLoading(false)
            })()
        }
    }, [page])

    useEffect(() => {
        setFilteredPokemons(pokemonsLoaded)
    }, [pokemonsLoaded])

    useEffect(() => {
        if (sortedPokemons) setFilteredPokemons(sortedPokemons)
        setSortedPokemons(false)
        setLoading(false)
    }, [sortedPokemons])

    const reloadPage = async () => {
        setLoading(true)
        await getPokemons(page)
        setName("")
        setLoading(false)
    }

    const orderByName = (mode) => {
        let number = []
        if (mode === "descendent") number = [1, -1]
        else number = [-1, 1]
        setLoading(true)
        setSortedPokemons(filteredPokemons.sort(function (a, b) {
            if (a.name > b.name) return number[0];
            if (a.name < b.name) return number[1];
            return 0
        }))
    }

    const orderByForce = (mode) => {
        let number = []
        if (mode === "descendent") number = [1, -1]
        else number = [-1, 1]
        setLoading(true)
        setSortedPokemons(filteredPokemons.sort(function (a, b) {
            if (a.stats[1].base_stat > b.stats[1].base_stat) return number[0];
            if (a.stats[1].base_stat < b.stats[1].base_stat) return number[1];
            return 0
        }))
    }

    function handleChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name) {
            (async () => {
                setLoading(true)
                await searchPokemon(name)
                setLoading(false)
            })()
        }

    }

    return (
        <div>
            <h2>Busca a tu pokemon</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input
                        placeholder="Pokemon"
                        value={name}
                        onChange={e => handleChange(e)}
                    />
                    <button type="button" onClick={() => reloadPage()}>Recargar</button>
                </div>
                <button type="submit">BUSCAR</button>
            </form>
            <div>
                <button onClick={() => setPage(pokemonDetail.previous)}>Anterior</button>
                <button onClick={() => setPage(pokemonDetail.next)}>Siguiente</button>
            </div>
            <div>
                <h4>Ordenar Por</h4>
                <button onClick={() => orderByForce("descendent")}>Fuerza ⬆</button>
                <button onClick={() => orderByForce("ascendent")}>Fuerza ⬇</button>
                <button onClick={() => orderByName("descendent")}>ABC ⬆</button>
                <button onClick={() => orderByName("ascendent")}>ABC ⬇</button>
            </div>
            <div className="pokedex">
                {
                    loading ? (<div>Cargando pokemons...</div>) : (
                        error ? (<div> No Se encuentra el pokemon</div>) : (
                            filteredPokemons && filteredPokemons.map((pokemon, index) => (
                                <Pokemon className="poke"
                                    key={index}
                                    id={pokemon.id}
                                    name={pokemon.name}
                                    image={pokemon.sprites.front_default}
                                    types={pokemon.types}
                                    stats={pokemon.stats}
                                    height={pokemon.height}
                                    weight={pokemon.weight}
                                />
                            ))
                        )
                    )
                }
            </div>
        </div>
    )
}

function mapStatetoProps(state) {
    return {
        pokemonsLoaded: state.pokemonsLoaded,
        pokemonDetail: state.pokemonDetail,
        loading: state.loading,
        error: state.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPokemons: page => dispatch(getPokemons(page)),
        searchPokemon: name => dispatch(searchPokemon(name))
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Home);