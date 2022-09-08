import React,{useState} from 'react';
import CardPokemon from '../CardPokemon/CardPokemon';
import spiner from '../../../Spinner-5.gif';

const ListaPokemos = (props)=>{


    if(props.pokemons.length === 0) return ( <img src={spiner} alt="Cargardo . . ." /> )

    
    return (
        <>
            {props.pokemons.map( p => (
                <CardPokemon  key={p.name} pokemon={p} />
            ))}
        </>
    )
}

export default ListaPokemos;