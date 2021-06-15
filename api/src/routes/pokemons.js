const { Router } = require('express');
const { Pokemon } = require('../db');
const { getPokemonsApi } = require('../controllers/Pokemons');
const router = Router();

router.get('/', async (req, res) => {

	try {
		const pokemons = await getPokemonsApi();
		return res.status(200).send(pokemons);
	} catch (error) {
		res.status(404).send('Pokemons not found');
	}
});

module.exports = router;