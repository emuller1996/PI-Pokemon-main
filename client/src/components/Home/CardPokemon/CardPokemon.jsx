import React from 'react';
import { Link } from 'react-router-dom';
import './CardPokemon.css';


const CardPokemon = (props)=>{


    return (
        <div  key={props.pokemon.name} className='card-pokemon'>
            <img className='img-pokemon' src={props.pokemon.img} alt="" />
            <h2> <Link to={`/pokemon/${props.pokemon.id}`}> {props.pokemon.name} </Link> </h2>
            
            <ul className='tipes'>
            <p>Tipos</p>
            {props.pokemon.types.map( t => (
                <li>{t.type.name}</li>
            ))}
            </ul>
            
        </div>
    )
}

export default CardPokemon;