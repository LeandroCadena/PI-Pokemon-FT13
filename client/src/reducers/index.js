import { GET_POKEMONS, GET_POKEMON_DETAIL, SEARCH_POKEMON, ERROR } from '../actions'

const initialState = {
    pokemonsLoaded: [],
    error: false,
    pokemonDetail: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemonsLoaded: action.payload,
                error: false
            };
        case GET_POKEMON_DETAIL:
            return {
                ...state,
                pokemonDetail: action.payload,
                error: false
            }
        case SEARCH_POKEMON:
            return {
                ...state,
                pokemonsLoaded: action.payload,
                error: false
            }
        case ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}

export default reducer;