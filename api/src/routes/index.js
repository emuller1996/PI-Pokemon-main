const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemon', async (req, res) =>{
    const name = req.query.name;
    if(name){
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const pokemon = result.data;
        res.json({pokemon});
    }else{
        const result = await axios.get('https://pokeapi.co/api/v2/pokemon')
        const pokemons = result.data.results;   
        const p =  pokemons.map( async (p) => {
            const result = await axios.get(p.url);
            return  Object.assign(p,{img : result.data.sprites.other.dream_world.front_default, types : result.data.types  });
        })         
         await Promise.all(p)        
        res.json({pokemons});
    }   
})

router.get('/pokemon/:id', async (req, res) =>{
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`);
    const pokemon = result.data;
    res.json({pokemon});
})

router.get('/types', async (req, res)=>{
    const result = await axios.get('https://pokeapi.co/api/v2/type')
    const types = result.data.results;
    res.json({types});
})


module.exports = router;
