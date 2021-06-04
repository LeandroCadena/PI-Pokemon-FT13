export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMONS_BY_URL = 'GET_POKEMONS_BY_URL';
export const GET_POKEMON_DETAIL = 'GET_POKEMON_DETAIL';

export function getPokemons() {
    return function (dispatch) {
        return fetch(`https://pokeapi.co/api/v2/pokemon`)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: GET_POKEMONS, payload: json.results });
            })
    }
}

export function getPokemonsByURL(url) {
    return function (dispatch) {
        return fetch(`${url}`)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: GET_POKEMONS_BY_URL, payload: json });
            })
    }
}