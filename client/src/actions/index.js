export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON_DETAIL = 'GET_POKEMON_DETAIL';

export function getPokemons(page) {
    return function (dispatch) {
        return fetch(page)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: GET_POKEMON_DETAIL, payload: json })
                return Promise.all(json.results.map(async (pokemon) => {
                    const res = await fetch(pokemon.url)
                    const data = await res.json()
                    return {
                        index: data.id,
                        name: data.name,
                        img: data.sprites.front_default,
                        types: data.types
                    }
                }))
            })
            .then(results => {
                dispatch({ type: GET_POKEMONS, payload: results })
            })
    }
}

