import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import Pokemon from '../Pokemon/Pokemon';

export function Pokedex({ pokemonsLoaded }) {
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [sortedPokemons, setSortedPokemons] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(loading === true) {
            setFilteredPokemons(sortedPokemons)
            setLoading(false)
        } else {
            setFilteredPokemons(pokemonsLoaded)
        }
    }, [pokemonsLoaded, loading])

    const orderByName = () => {
        setSortedPokemons(filteredPokemons.sort(function (a, b) {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0
        }))
        setLoading(true)
    }

    const orderByForce = () => {
        setSortedPokemons(filteredPokemons.sort(function (a, b) {
            if (a.stats[1].base_stat > b.stats[1].base_stat) return 1;
            if (a.stats[1].base_stat < b.stats[1].base_stat) return -1;
            return 0
        }))
        setLoading(true)
    }
    
    return (
        <div>
            <div className="header">
                <h1>Pokedex</h1>
            </div>
            <div>
                <h4>Ordenar Por</h4>
                <button onClick={() => orderByForce()}>Fuerza</button>
                <button onClick={() => orderByName()}>ABC</button>
            </div>
            <div className="pokedex-grid">
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
            </div>
        </div>
    )
}

function mapStatetoProps(state) {
    return {
        pokemonsLoaded: state.pokemonsLoaded,
        pokemonDetail: state.pokemonDetail
    }
}

export default connect(mapStatetoProps)(Pokedex);
