import { POKEMON_URL, POKEMON_TYPES, POKEMON_TYPES_API, POKEMON_NAME } from '../utils/constants'
import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const SET_POKEMONS_TYPES = 'SET_POKEMONS_TYPES';
export const CREATE_NEW_POKEMON = 'CREATE_NEW_POKEMON';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const SEARCH_POKEMON = 'SEARCH_POKEMON';
export const SET_NAME = 'SET_NAME';
export const RELOAD_POKEMONS = 'RELOAD_POKEMONS';
export const SET_LOADING = 'SET_LOADING';
export const FILTER_POKEMONS = 'FILTER_POKEMONS';
export const CHANGE_FILTER = 'CHANGE_FILTER';
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

export function setPokemonsTypes() {
    return async function (dispatch) {
        const res = await axios.get(POKEMON_TYPES_API);
        const PokemonsTypes = await Promise.all(res.data.results.map(async (type) => {
            const AddType = await axios.post(POKEMON_TYPES, { name: type.name })
            return AddType.data;
        }))
        dispatch({ type: SET_POKEMONS_TYPES, payload: PokemonsTypes })
    }
}

export function createNewPokemon(data) {
    return async function (dispatch) {
        const res = await axios.post(POKEMON_URL, data);
        dispatch({ type: CREATE_NEW_POKEMON, payload: res })
    }
}

export function searchPokemon(name) {
    return async function (dispatch) {
        try {
            dispatch({ type: SET_NAME, payload: name })
            const res = await axios.get(POKEMON_NAME + name);
            dispatch({ type: SEARCH_POKEMON, payload: res.data })
        } catch (error) {
            dispatch({ type: SEARCH_POKEMON, payload: null })
        }
    }
}

export function setLoading() {
    return async function (dispatch) {
        dispatch({ type: SET_LOADING })
    }
}

export function reloadPokemons() {
    return async function (dispatch) {
        dispatch({ type: RELOAD_POKEMONS })
    }
}

export function filterPokemons(type) {
    return async function (dispatch) {
        dispatch({ type: CHANGE_FILTER })
        dispatch({ type: FILTER_POKEMONS, payload: type })
    }
}
