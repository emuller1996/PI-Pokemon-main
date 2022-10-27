const { Router } = require("express");
const axios = require('axios');
const { Tipo } =  require('../db');

const router = Router();



router.get('/', async (req, res)=>{
    const result = await axios.get('https://pokeapi.co/api/v2/type')
    const types = result.data.results;
    
    const t = types.map( async t=>{
        const result = await axios.get(t.url);
        return Object.assign(t, {id : result.data.id});
    })
    await Promise.all(t)   
    
    types.map( async t=> {
        await  Tipo.findOrCreate({
            where: { id: t.id },
            defaults: { 
                id: t.id,
                name : t.name
            }
          })
    })
    
    res.json({types});
})

module.exports = router;