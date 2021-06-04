import { GET_POKEMONS, GET_POKEMON_DETAIL } from '../actions'

const initialState = {
    pokemonsLoaded: [],
    pokemonsLoadedByURL: [],
    pokemonDetail: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemonsLoaded: action.payload
            };
        case GET_POKEMON_DETAIL:
            return {
                ...state,
                pokemonDetail: action.payload
            }
        default:
            return state
    }
}