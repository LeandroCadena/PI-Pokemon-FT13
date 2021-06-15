const axios = require('axios');
const { POKEMON_URL } = require('../utils/constants');
const { Pokemon, Type } = require('../db');

const getPokemonsApi = async () => {
    const firstURL = await axios.get(POKEMON_URL);
    const secondURL = await axios.get(firstURL.data.next);
    const pokemonsApi = firstURL.data.results.concat(secondURL.data.results);

    const pokemons = await Promise.all(pokemonsApi.map(async (pokemon) => {
        const poke = await axios(pokemon.url);
        const data = poke.data;
        return {
            id: data.id,
            name: data.name,
            image: data.sprites.front_default,
            types: data.types.map(type => {
                return type.type.name;
            }),
            stats: data.stats.map(stat => {
                return { name: stat.stat.name, value: stat.base_stat }
            }),
            height: data.height,
            weight: data.weight
        }
    }))
    return pokemons;
}

const getPokemonsDatabase = async () => {
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    });
};

const getAllPokemons = async () => {
    const pokemonsApi = await getPokemonsApi();
    const pokemonsDB = await getPokemonsDatabase();
    const allPokemons = pokemonsApi.concat(pokemonsDB);
    return allPokemons;
};

module.exports = {
    getPokemonsApi,
    getPokemonsDatabase,
    getAllPokemons
};