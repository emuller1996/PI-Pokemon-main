import React from 'react';
import { Link } from 'react-router-dom';
import './CardPokemon.css';


const CardPokemon = (props)=>{


    return (
        <Link to={`/pokemon/${props.pokemon.id}`} className='card-pokemon'>
            <div  key={props.pokemon.name} >
                <h2>  {props.pokemon.name} </h2>
                <img className='img-pokemon' src={props.pokemon.img} alt="IMAGE_POKEMON" />
                
                
                <ul className='tipes'>
                <p>Types</p>
                {props.pokemon.types.map( t => (
                    <li>{ t.type ?  t.type.name :t.name}</li>
                ))}
                </ul>
                
                
            </div>
        </Link>
    )
}

export default CardPokemon;