const { Router } = require('express');
const { Type } = require('../db');
const router = Router();
const { SearchPokemonType } = require('../controllers/Types')

router.get('/', async (req, res) => {
	let allTypes = await Type.findAll();
	return res.status(200).send(allTypes);
});

router.post('/', async (req, res) => {
	const { name } = req.body;
	const type = await SearchPokemonType(name);

	if (!type) {
		try {
			const newType = await Type.create({ name });
			return res.status(200).send(newType);
		} catch (error) {
			res.status(400).send(error);
		}
	}
	return res.status(200).send(type)
});

module.exports = router;