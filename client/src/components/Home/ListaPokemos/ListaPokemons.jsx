import React from 'react';
import CardPokemon from '../CardPokemon/CardPokemon';


const ListaPokemos = (props)=>{



    return (
        <>
            {props.pokemons.map( p => (
                <CardPokemon  pokemon={p} />
            ))}
        </>
    )
}

export default ListaPokemos;