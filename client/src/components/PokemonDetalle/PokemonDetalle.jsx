import React,{useEffect} from 'react';
import { connect } from "react-redux";
import { getPokemonDetalle } from "../../actions/index";
import spiner from '../../Spinner-5.gif';
import './PokemonDetalle.css';


const PokemonDetalle =(props)=>{


    useEffect(  ()=>{

        const detail = async()=>{
            await props.getPokemonDetalle(props.match.params.id);
        }
        detail();

    },[])




    if(!props.pokemonDetalle.name){
        return (
            <img className='spinner' src={spiner} alt="Cargardo . . ." />
        ) 
    }else{
        return(
            <div className='card-pokemon-detalle'>
                
                    <img src={props.pokemonDetalle.sprites.other.dream_world.front_default} alt="asd" />
                    <h1>{props.pokemonDetalle.name}</h1>
                    <div className='detalle-flex'>
                        <ul className='tipes'>
                            <p>Tipos</p>
                            {props.pokemonDetalle.types.map( t => (
                                <li key={t.name}>{t.type.name}</li>
                            ))}
                        </ul>

                        <ul className='stats'>
                            <p>Stats</p>
                            {props.pokemonDetalle.stats.map( s => (
                                <li key={s.name}> {`${s.stat.name} :  ${s.base_stat}`}</li>
                            ))}
                        </ul>

                        <ul className='tipes'>
                            <li> id : {props.pokemonDetalle.id}</li>
                            <li> Peso : {props.pokemonDetalle.weight} Kg</li>
                            <li> Altura : {props.pokemonDetalle.height} m</li>

                            
                        </ul>



                    </div>
                
                
            </div>
        )
    }
    

}

function mapStateToProps(state) {
    return {
        pokemonDetalle: state.pokemonDetalle
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        getPokemonDetalle : (id) => dispatch(getPokemonDetalle(id)) 
    };
  }


export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetalle);

