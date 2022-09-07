import React,{useState} from 'react';
import CardPokemon from '../CardPokemon/CardPokemon';


const ListaPokemos = (props)=>{


    

    
    return (
        <>
            {props.pokemons.map( p => (
                <CardPokemon  key={p.name} pokemon={p} />
            ))}
        </>
    )
}

export default ListaPokemos;