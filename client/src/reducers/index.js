import { GET_POKEMONS, CHANGE_PAGE, SET_POKEMONS_TYPES, CREATE_NEW_POKEMON, SEARCH_POKEMON, SET_LOADING, RELOAD_POKEMONS, SET_NAME, CHANGE_FILTER, FILTER_POKEMONS, ERROR } from '../actions'
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
        case SET_NAME:
            return {
                ...state,
                searchName: payload
            }
        case SEARCH_POKEMON:
            if (payload) {
                if (payload[0].name === state.searchName) {
                    return {
                        ...state,
                        searchView: payload,
                        loading: {
                            ...state.loading,
                            error: false,
                        },
                    }
                } else {
                    return {
                        ...state,
                    }
                }
            } else {
                return {
                    ...state,
                    searchView: [],
                    loading: {
                        ...state.loading,
                        error: 'Pokemon not found',
                    },
                }
            }
        case SET_LOADING:
            return {
                ...state,
                searchView: [],
                loading: {
                    ...state.loading,
                    search: true,
                    error: false
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
        case CHANGE_FILTER:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    pokemons: true,
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
        default:
            return state
    }
}

export default reducer;