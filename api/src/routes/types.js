const { Router } = require('express');
const { Type } = require('../db');
const router = Router();

router.get('/', async (req, res) => {
	let allTypes = await Type.findAll();
	return res.status(200).send(allTypes);
});
module.exports = router;