import { POKEMON_URL, POKEMON_TYPES, POKEMON_TYPES_API } from '../utils/constants'
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
        const res = await axios.get(POKEMON_TYPES);
        dispatch({ type: GET_POKEMONS_TYPES, payload: res.data });
    } catch (error) {
        console.log(error);
    }
};

export const setPokemonsTypes = async () => {
    try {
        const res = await axios.get(POKEMON_TYPES_API);
        const PokemonsTypes = await Promise.all(res.data.results.map(async (type, index) => {
            const AddType = await axios.post(POKEMON_TYPES, { name: type.name })
            return AddType;
        }))
        return PokemonsTypes;
    } catch (error) {
        console.log(error)
    }
}
