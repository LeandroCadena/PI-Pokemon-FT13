const { Type } = require('../db')

const getPokemonTypes = async (types) => {
    const res = Promise.all(types.map(async (type) => {
        return await Type.findOne({ where: { name: type } })
    }))
    return res;
};

module.exports = {
    getPokemonTypes
};