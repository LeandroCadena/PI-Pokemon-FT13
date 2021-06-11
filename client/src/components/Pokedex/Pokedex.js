import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import Pokemon from '../Pokemon/Pokemon';

export function Pokedex({ pokemonsLoaded }) {
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    useEffect(() => {
        setFilteredPokemons(pokemonsLoaded)
    }, [pokemonsLoaded])

    return (
        <div>
            <div className="header">
                <h1>Pokedex</h1>
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
