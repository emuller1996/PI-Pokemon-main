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
    it('should get 200', () => agent.get('/pokemons').expect(200));
    it('get pokemon by name requested by parameters.', () => agent.get('/pokemons?name=bulbasaur').then(res => {
      expect(res.body.pokemon.weight).equal(69);
    }));
    it('get requested pokemon by parameter id', () => agent.get('/pokemons/2').then(res => {
      expect(res.body.pokemon.weight).equal(130);
    }))
  });

  describe('POST /pokemons', () => {
    it('the pokemon is created correctly.', async () => {

      const r = await agent.post('/pokemons')
        .send({
          name: "e",
          "vida": 12,
          "ataque": 12,
          "defensa": 31,
          "velocidad": 12,
          "peso": 32,
          "altura": 12,
          types: [{ id: "1", name: "normal" }, { id: "2", name: "fighting" }]
        })
      expect(r.statusCode).equal(201);
    }

    )
  })
});
