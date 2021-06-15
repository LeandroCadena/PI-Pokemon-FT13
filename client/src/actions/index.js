import { POKEMON_URL } from '../utils/constants'
import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const ERROR = 'ERROR';

export function getPokemons() {
    return async function (dispatch) {
        return axios.get(POKEMON_URL)
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

