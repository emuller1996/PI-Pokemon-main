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

                
                    <img src={props.pokemonDetalle.sprites ? props.pokemonDetalle.sprites.other.dream_world.front_default : props.pokemonDetalle.img } alt="asd" />
                    <div className='body-card'>
                        <h1>{props.pokemonDetalle.name}</h1>
                        <h3 > ID  : {props.pokemonDetalle.id}</h3>
                        <div className='detalle-flex'>
                            <ul className='tipes'>
                                <p>Tipos</p>
                                {props.pokemonDetalle.types.map( t => (
                                    t.type ?  <li key={t.name}>{t.type.name}</li>  : <li key={t.name}>{t.name}</li>
                                ))}
                            </ul>

                            <ul className='stats'>
                                <p>Stats</p>
                                { props.pokemonDetalle.stats ? props.pokemonDetalle.stats.map( s => (
                                    <li key={s.name}> {`${s.stat.name} :  ${s.base_stat}`}</li>
                                )) : ( <>
                                        <li> hp :  {props.pokemonDetalle.vida}</li>
                                        <li> attack  :  {props.pokemonDetalle.ataque}</li>
                                        <li> defense   :  {props.pokemonDetalle.defensa}</li>
                                        <li> speed   :  {props.pokemonDetalle.velocidad}</li>
                                    </>
                                )}
                            </ul>

                            <ul className='tipes'>
                                <li> Peso : {props.pokemonDetalle.weight ? props.pokemonDetalle.weight : props.pokemonDetalle.peso } Kg</li>
                                <li> Altura : {props.pokemonDetalle.height ? props.pokemonDetalle.height : props.pokemonDetalle.altura } m</li>
                            </ul>
                        </div>
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

