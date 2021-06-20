import { GET_POKEMONS, CHANGE_PAGE, SET_POKEMONS_TYPES, CREATE_NEW_POKEMON, SEARCH_POKEMON, SET_LOADING, RELOAD_POKEMONS, CHANGE_FILTER, FILTER_POKEMONS, ERROR } from '../actions'
import setViews from '../controllers/Views';

const initialState = {
    pokemonsViews: [],
    pokemonsTypes: [],
    pokemonsLoaded: [],
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
                pokemonsLoaded: payload,
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
                searchView: payload,
            }
        case SET_LOADING:
            return {
                ...state,
                searchView: [],
                loading: {
                    ...state.loading,
                    search: true
                },
            }
        case RELOAD_POKEMONS:
            return {
                ...state,
                pokemonsViews: setViews(state.pokemonsLoaded),
                searchView: [],
                loading: {
                    ...state.loading,
                    search: false
                },
            }
        case CHANGE_FILTER:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    pokemons: true,
                },
            }
        case FILTER_POKEMONS:
            return {
                ...state,
                pokemonsViews: setViews(state.pokemonsLoaded, payload),
                loading: {
                    ...state.loading,
                    pokemons: false
                },
            }
        default:
            return state
    }
}

export default reducer;