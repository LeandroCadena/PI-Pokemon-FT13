const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
    });
    describe('attributes', () => {
      it('should throw an error if attribute is wrong', (done) => {
        Pokemon.create({ name: 'Pikachu', hp: 'Invalid data type' })
          .then(() => done(new Error('It requires a valid type')))
          .catch(() => done());
      });
      it('should work when its a valid attribute', (done) => {
        Pokemon.create({ name: 'Test', hp: 12 })
          .then(() => {
            Pokemon.findOne({
              where: {
                name: 'Test',
              },
            })
              .then(pokemon => {
                expect(pokemon.name).to.equal('Test')
                expect(pokemon.hp).to.equal(12)
                done()
              })
              .catch(() => done(new Error('It requires a valid attribute')))
          });
      });
    });
  });
});
