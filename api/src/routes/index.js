const { Router } = require('express');
const axios = require('axios');
const { Pokemon,Tipo } =  require('../db');
const { v1, validate  }  =  require('uuid');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemon', async (req, res) =>{
    const name = req.query.name;
    const pokemonDB = await  Pokemon.findAll({
        include : { model: Tipo, as: 'types' } 
    });
    if(name){
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const pokemon = result.data;
        res.json({pokemon});
    }else{
        const result = await axios.get('https://pokeapi.co/api/v2/pokemon')
        const pokemons = result.data.results;   
        const p =  pokemons.map( async (p) => {
            const result = await axios.get(p.url);
            return  Object.assign(p,{ 
                img : result.data.sprites.other.dream_world.front_default, 
                types : result.data.types,
                id : result.data.id,
                ataque :  result.data.stats[1].base_stat });
        })         
         await Promise.all(p)            
         var pkAll = pokemons.concat(JSON.parse(JSON.stringify(pokemonDB)))
        res.json({pokemons : pkAll});
    }   
})

router.get('/pokemon/:id', async (req, res) =>{

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

router.get('/types', async (req, res)=>{
    const result = await axios.get('https://pokeapi.co/api/v2/type')
    const types = result.data.results;
    
    const t = types.map( async t=>{
        const result = await axios.get(t.url);
        return Object.assign(t, {id : result.data.id});
    })
    await Promise.all(t)     
    
    res.json({types});
})

router.post('/pokemon', async (req, res)=>{
    const newPokemon = req.body;
    const types =  req.body.types;
  
    delete newPokemon.types; 
    Object.assign(newPokemon, {id :v1()})    
        
    const pokeCreated = await Pokemon.create(newPokemon); 
    types.map(t => {
        pokeCreated.createType(t);
    })
    res.status(201).send({msg: 'Pokemon Creado', pokeCreated: pokeCreated})
})


module.exports = router;
