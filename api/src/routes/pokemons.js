const { Router } = require("express");
const { Pokemon,Tipo } =  require('../db');
const axios = require('axios');
const { v1, validate  }  =  require('uuid');

const router = Router();




router.get('/', async (req, res) =>{
    const name = req.query.name;
    var pokemons;
    const pokemonDB = await  Pokemon.findAll({
        include : { model: Tipo, as: 'types' } 
    });
    if(name){
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const pokemon = result.data;
        res.json({pokemon});
    }else{
        try {
            const result = await axios.get('https://pokeapi.co/api/v2/pokemon')
            pokemons = result.data.results;   
            const p =  pokemons.map( async (p) => {
                const result = await axios.get(p.url);
                return  Object.assign(p,{ 
                    img : result.data.sprites.other.dream_world.front_default, 
                    types : result.data.types,
                    id : result.data.id,
                    ataque :  result.data.stats[1].base_stat,
                    vida :  result.data.stats[0].base_stat});
            })         
            await Promise.all(p)  
        
        } catch (error) {
            pokemons = []
        }
                  
         var pkAll = pokemons.concat(JSON.parse(JSON.stringify(pokemonDB)))
        res.json({pokemons : pkAll});
    }   
})


router.get('/:id', async (req, res) =>{

    if(validate(req.params.id)) {
        const pokeCreated = await Pokemon.findOne({ 
            include : { model: Tipo, as: 'types' },
            where: { id: req.params.id },
             });
        console.log(JSON.parse(JSON.stringify(pokeCreated)));
        res.json({pokemon:JSON.parse(JSON.stringify(pokeCreated))});
    }else{
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`);
        const pokemon = result.data;
        res.json({pokemon});
    }
    
    
})

router.post('/', async (req, res)=>{
    const newPokemon = req.body;
    const types =  req.body.types;
  
    delete newPokemon.types; 
    Object.assign(newPokemon, {id :v1()})    
        
    const pokeCreated = await Pokemon.create(newPokemon); 
    types.map(async t => {
        await pokeCreated.addType(t.id);
    })
    res.status(201).json({msg: 'Pokemon Creado', pokeCreated: pokeCreated})
})


module.exports = router;