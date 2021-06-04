export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON_DETAIL = 'GET_POKEMON_DETAIL';

export function getPokemons(name) {
    return function (dispatch) {
        return fetch("https://pokeapi.co/api/v2/pokemon")
            .then(response => response.json())
            .then(json => {
                dispatch({type: GET_POKEMONS, payload: json.results});
            })
    }
}