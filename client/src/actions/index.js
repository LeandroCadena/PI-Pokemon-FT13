export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON_DETAIL = 'GET_POKEMON_DETAIL';
export const SEARCH_POKEMON = 'SEARCH_POKEMON';
export const ERROR = 'ERROR';

export function getPokemons(page) {
    return function (dispatch) {
        return fetch(page)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: GET_POKEMON_DETAIL, payload: json })
                return Promise.all(json.results.map(async (pokemon) => {
                    const res = await fetch(pokemon.url)
                    const data = await res.json()
                    return data
                }))
            })
            .then(results => {
                dispatch({ type: GET_POKEMONS, payload: results })
            })
            .catch(error => {
                dispatch({ type: ERROR, payload: error })
            })
    }
}

export function searchPokemon(name) {
    return function (dispatch) {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(response => response.json())
            .then(data => {
                dispatch({ type: SEARCH_POKEMON, payload: [data] })
            })
            .catch(error => {
                dispatch({ type: ERROR, payload: error })
            })
    }
}

