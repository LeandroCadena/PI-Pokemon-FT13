import { POKEMON_URL, POKEMON_TYPES, POKEMON_TYPES_API, POKEMON_NAME } from '../utils/constants'
import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const SET_POKEMONS_TYPES = 'SET_POKEMONS_TYPES';
export const CREATE_NEW_POKEMON = 'CREATE_NEW_POKEMON';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const SEARCH_POKEMON = 'SEARCH_POKEMON';
export const RELOAD_POKEMONS = 'RELOAD_POKEMONS';
export const SET_LOADING = 'SET_LOADING';
export const FILTER_POKEMONS = 'FILTER_POKEMONS';
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
            const res = await axios.get(`${POKEMON_URL}/name/${name}`);
            const data = res.data;
            const pokemon = [{
                id: data.id,
                name: data.name,
                image: data.sprites.front_default,
                Types: data.types.map(type => {
                    return { name: type.type.name };
                }),
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
                height: data.height,
                weight: data.weight
            }]
            dispatch({ type: SEARCH_POKEMON, payload: pokemon })
        } catch (error) {
            dispatch({ type: ERROR, payload: 'Pokemon not found' })
        }
    }
}

export function setLoading(state) {
    return async function (dispatch) {
        dispatch({ type: SET_LOADING, payload: state })
    }
}

export function reloadPokemons() {
    return async function (dispatch) {
        dispatch({ type: RELOAD_POKEMONS })
    }
}

export function filterPokemons(data) {
    return async function (dispatch) {
        dispatch({ type: FILTER_POKEMONS, payload: data })
    }
}
