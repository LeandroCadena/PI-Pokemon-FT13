const { Router } = require('express');
const { Type } = require('../db');
const router = Router();

router.get('/', async (req, res) => {
	let allTypes = await Type.findAll();
	return res.status(200).send(allTypes);
});

router.post('/', async (req, res) => {
	const { name } = req.body;

	const newType = await Type.create({ name });

	return res.status(200).send(newType);
});

module.exports = router;