import { GET_POKEMONS, GET_POKEMON_DETAIL, SEARCH_POKEMON } from '../actions'

const initialState = {
    pokemonsLoaded: [],
    pokemonDetail: {}
}

const reducer = (state = initialState, action) => {
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
        case SEARCH_POKEMON:
            return {
                ...state,
                pokemonsLoaded: action.payload
            }
        default:
            return state
    }
}

export default reducer;