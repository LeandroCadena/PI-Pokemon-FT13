/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
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
    it('If the name query is passed, the pokemon should respond by that name', async () => {
      try {
        const res = await agent.get('/pokemons?name=bulbasaur');
        expect(res.body[0].name).to.be.equal('bulbasaur');
      } catch (err) { }
    }).timeout(30000);
    it('If an id parameter is passed it must return the pokemon associated with that id', async () => {
      try {
        const res = await agent.get('/pokemons/1');
        expect(res.body[0].name).to.be.equal('bulbasaur');
      } catch (err) { }
    }).timeout(47000);
  });

  // describe('POST /pokemons', () => {
  // 	it('responds with 200', async () => {
  // 		try {
  // 			await agent.post('/pokemons').send({name: 'Toni', type: 1}).expect(200);
  // 		} catch (err) {
  // 			console.log(err);
  // 		}
  // 	});

  // 	it('If you dont pass the name,respond with a 400', async () => {
  // 		try {
  // 			await agent.post('/pokemons').send({}).expect(400);
  // 		} catch (err) {
  // 			console.log(err);
  // 		}
  // 	});
  // 	it('If you dont pass the pokemon type,respond with a 400', async () => {
  // 		try {
  // 			await agent.post('/pokemons').send({name: 'Toni'}).expect(400);
  // 		} catch (err) {
  // 			console.log(err);
  // 		}
  // 	});
  // 	it('you should create a pokemon correctly', async () => {
  // 		try {
  // 			const res = await agent
  // 				.post('/pokemons')
  // 				.send({name: 'Diego', type: 1});
  // 			expect(res.body.name).to.be.equal('Diego');
  // 		} catch (err) {
  // 			console.log(err);
  // 		}
  // 	});
  // });
});
