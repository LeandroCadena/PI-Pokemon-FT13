const { Router } = require('express');
const { Pokemon } = require('../db');
const { SEARCH_BY_ID, SEARCH_BY_NAME } = require('../utils/constants');
const { getAllPokemons, getPokemonDetail } = require('../controllers/Pokemons');
const { getPokemonTypes } = require('../controllers/Types');
const router = Router();

router.get('/', async (req, res) => {
	let pokemons = await getAllPokemons();

	return res.status(200).send(pokemons);
});

router.post('/name', async (req, res) => {
	const { name } = req.body;

	if (name) {
		const pokemonDetail = await getPokemonDetail(SEARCH_BY_NAME, name);
		pokemonDetail
			? res.status(200).send(pokemonDetail)
			: res.status(404).send('Pokemon not found');
	}
})

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	if (id) {
		const pokemonDetail = await getPokemonDetail(SEARCH_BY_ID, id);
		pokemonDetail
			? res.status(200).send(pokemonDetail)
			: res.status(404).send('Pokemon not found');
	}
});

router.post('/', async (req, res) => {
	const {
		name,
		hp,
		attack,
		defense,
		speed,
		height,
		weight,
		type,
		image,
	} = req.body;

	const newPokemon = await Pokemon.create({
		name,
		hp,
		attack,
		defense,
		speed,
		height,
		weight,
		image,
	});

	const allTypes = await getPokemonTypes(type);

	newPokemon.setTypes(allTypes);

	return res.status(200).send(newPokemon);
});



module.exports = router;