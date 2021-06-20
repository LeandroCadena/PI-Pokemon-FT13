import { GET_POKEMONS, CHANGE_PAGE, SET_POKEMONS_TYPES, CREATE_NEW_POKEMON, SEARCH_POKEMON, SET_LOADING, ERROR } from '../actions'
import setViews from '../controllers/Views';

const initialState = {
    pokemonsViews: [],
    pokemonsTypes: [],
    searchView: [],
    loading: {
        types: true,
        pokemons: true,
        search: false,
        error: false,
    },
    actualPage: false,
    pokemonDetail: {}
}

const reducer = (state = initialState, { payload, type }) => {
    switch (type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemonsViews: setViews(payload),
                loading: {
                    ...state.loading,
                    pokemons: false,
                    search: false
                },
                actualPage: 0,
                error: false
            };
        case CHANGE_PAGE:
            return {
                ...state,
                actualPage: payload
            }
        case SET_POKEMONS_TYPES:
            return {
                ...state,
                pokemonsTypes: payload,
                loading: {
                    ...state.loading,
                    types: false
                }
            }
        case CREATE_NEW_POKEMON:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    pokemons: true
                }
            }
        case SEARCH_POKEMON:
            return {
                ...state,
                searchView: setViews(payload),
            }
        case SET_LOADING:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    search: true
                },
            }
        default:
            return state
    }
}

export default reducer;