import { GET_POKEMONS, CHANGE_PAGE, GET_POKEMONS_TYPES, ERROR } from '../actions'
import setViews from '../controllers/Views';

const initialState = {
    pokemonsLoaded: [],
    pokemonsViews: [],
    pokemonsTypes: [],
    actualPage: false,
    error: false,
    pokemonDetail: {}
}

const reducer = (state = initialState, { payload, type }) => {
    switch (type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemonsViews: setViews(payload),
                pokemonsLoaded: payload,
                actualPage: 0,
                error: false
            };
        case CHANGE_PAGE:
            return {
                ...state,
                actualPage: payload
            }
        case GET_POKEMONS_TYPES:
            return {
                ...state,
                pokemonsTypes: payload,
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