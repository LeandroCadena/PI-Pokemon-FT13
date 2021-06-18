import { POKEMON_URL, POKEMON_TYPES } from '../utils/constants'
import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMONS_TYPES = 'GET_POKEMONS_TYPES';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const ERROR = 'ERROR';

export function getPokemons() {
    return async function (dispatch) {
        return await axios.get(POKEMON_URL)
            .then(response => {
                dispatch({ type: GET_POKEMONS, payload: response.data })
            })
    }
}

export function changePage(page) {
    return function (dispatch) {
        dispatch({ type: CHANGE_PAGE, payload: page })
    }
}

export const getPokemonTypes = () => async (dispatch) => {
    try {
        const res = await axios.get('https://pokeapi.co/api/v2/type');
        dispatch({ type: GET_POKEMONS_TYPES, payload: res.data.results });
    } catch (err) {
        console.log(err);
    }
};

