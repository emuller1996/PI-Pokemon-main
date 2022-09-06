import React from 'react';


const CardPokemon = (props)=>{


    return (
        <div  key={props.pokemon.name} className='card-pokemon'>
            <img className='img-pokemon' src={props.pokemon.img} alt="" />
            <p>{props.pokemon.name}</p>
        </div>
    )
}

export default CardPokemon;