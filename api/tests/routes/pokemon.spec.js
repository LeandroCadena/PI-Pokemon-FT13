/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
  type: ['electric']
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  describe('GET /pokemons', () => {
    it('should get 200', (done) => {
      agent.get('/pokemons')
        .expect(200)
        .end(done)
    });
    it('responds with an array', (done) => {
      agent.get('/pokemons')
        .expect(200)
        .end(function (err, res) {
          expect(res.body).to.be.a('array')
          done()
        })
    });
    it('If the name query is passed, should responds by that name', (done) => {
      agent.get('/pokemons?name=charmander')
        .expect(200)
        .end(function (err, res) {
          expect(res.body[0].name).to.be.equal('charmander');
          done()
        })
    });
    it('If the idquery is passed, should responds by that id', (done) => {
      agent.get('/pokemons/1')
        .expect(200)
        .end(function (err, res) {
          expect(res.body[0].id).to.be.equal(1);
          done()
        })
    });
  });
  describe('POST /pokemons', () => {
    it('responds with 200', (done) => {
      agent.post('/pokemons')
        .send({ name: 'Test1', type: ['normal'] })
        .expect(200)
        .end(done)
    });

    it('If you dont pass the name,respond with a 400', (done) => {
      agent.post('/pokemons')
        .send({})
        .expect(400)
        .end(done)
    });
    it('If you dont pass the pokemon type,respond with a 400', (done) => {
      agent.post('/pokemons')
        .send({ name: 'Test2' })
        .expect(400)
        .end(done)
    });
    it('you should create a pokemon correctly', (done) => {
      agent.post('/pokemons')
        .send({ name: 'Test3', type: ['normal'] })
        .expect(200)
        .end(function (err, res) {
          expect(res.body.name).to.be.equal('Test3');
          done()
        })
    });
  });
});
