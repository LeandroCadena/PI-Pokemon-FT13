export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON_DETAIL = 'GET_POKEMON_DETAIL';

export function getPokemons(page) {
    return function (dispatch) {
        return fetch(page)
            .then(response => response.json())
            .then(json => {
                const poke = [];
                json.results.forEach(async (pokemon) => {
                    const res = await fetch(pokemon.url)
                    const data = await res.json()
                    poke.push({
                        index: data.id,
                        name: data.name,
                        img: data.sprites.front_default,
                        types: data.types
                    })
                })
                dispatch({
                    type: GET_POKEMONS, payload: {
                        pokemons: poke,
                        next: json.next,
                        previous: json.previous
                    }
                });
            })
    }
}