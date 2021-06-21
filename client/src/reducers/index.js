import { GET_POKEMONS, CHANGE_PAGE, SET_POKEMONS_TYPES, CREATE_NEW_POKEMON, SEARCH_POKEMON, SET_LOADING, RELOAD_POKEMONS, FILTER_POKEMONS, ERROR } from '../actions'
import setViews from '../controllers/Views';

const initialState = {
    pokemonsViews: [],
    pokemonsTypes: [],
    pokemonsLoaded: [],
    searchView: [],
    searchName: '',
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
                loading: {
                    ...state.loading,
                    error: false,
                },
            }
        case SET_LOADING:
            return {
                ...state,
                searchView: [],
                loading: {
                    ...state.loading,
                    [payload]: true
                },
            }
        case RELOAD_POKEMONS:
            return {
                ...state,
                pokemonsViews: setViews(state.pokemonsLoaded),
                searchView: [],
                loading: {
                    ...state.loading,
                    search: false,
                    error: false
                },
            }
        case FILTER_POKEMONS:
            const filteredViews = setViews(state.pokemonsLoaded, payload);
            if (filteredViews.length > 0) {
                return {
                    ...state,
                    pokemonsViews: filteredViews,
                    loading: {
                        ...state.loading,
                        error: false,
                        pokemons: false
                    },
                    actualPage: 0
                }
            } else {
                return {
                    ...state,
                    pokemonsViews: [],
                    loading: {
                        ...state.loading,
                        pokemons: false,
                        error: 'no pokemons of that type were found'
                    }
                }
            }
        case ERROR:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    error: payload
                }
            }
        default:
            return state
    }
}

export default reducer;