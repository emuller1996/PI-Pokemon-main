import React, {useEffect,useState} from 'react';
import { connect } from "react-redux";
import { getPokemos, orderPokemon } from "../../actions/index";
import CardPokemon from './CardPokemon/CardPokemon';
import {Link,NavLink} from 'react-router-dom';

import './Home.css';
import ListaPokemos from './ListaPokemos/ListaPokemons';
import Paginacion from './Paginacion/Paginacion';

const Home = (props)=>{

    const [order,setOrder] = useState('');
    const [paginaActual,setPaginaActual] = useState(1);
    const [pokemonPorPagina,setPokemonPorPagina] = useState(12);


    

    useEffect(  ()=>{
        console.log("Did Mount");   
        
   
         getPokemos();
        
        
            
        console.log(props.pokemosAll);

        
           
        
    },[props.pokemosAll]);

    
    console.log('calcualdo paginaciones')
    const UltimoIndice = paginaActual * pokemonPorPagina;
    const PrimerIndice =  UltimoIndice - pokemonPorPagina;
    const pokemonsActuales =  props.pokemosAll.slice(PrimerIndice,UltimoIndice);

    console.log(PrimerIndice)
    

    function Paginar (numeroPagina){
        setPaginaActual(numeroPagina);
    }

    function orderASC(){
        setOrder('ASC')
        console.log('order ASC')
        props.orderPokemon(props.pokemosAll,'ASC');
        
        console.log(props.pokemosAll);
    }
    function orderDESC(){
        setOrder('DESC')
        console.log('order DESC')
        props.orderPokemon(props.pokemosAll,'DESC');
        
        console.log(props.pokemosAll);
    }
    


    return (
        <div>
            <h1>HOME POKEMON APP</h1>
            <div className='nav-content'>
                <div className='row' >
                <Link to='pokemon/create' className='btn-buscar'> <i className="fas fa-plus-circle"></i> Nuevo Pokemon</Link>
                    <input  id='buscar_p' type="text" placeholder="Nombre del pokemon"  className='input-buscar'/>
                    <button className='btn-buscar'> <i className="fas fa-search"></i> Buscar</button>
                    
                </div>
                <div className='row'>
                <div>
                    <button onClick={()=>{ orderASC() }} className='btn-buscar'> <i className="fas fa-sort-alpha-down"></i> ASC</button>
                    <button onClick={orderDESC} className='btn-buscar'> <i className="fas fa-sort-alpha-down-alt"></i> DESC</button>
                </div>
                
                <select class="filter-select" id="filter">
                    <option value="Creados">Creados</option>
                    <option value="Existentes">Existentes</option>

                </select>
                    
                </div>

            </div>
            
            
            <div className='container-card'>

            {props.pokemosAll ? <ListaPokemos pokemons={pokemonsActuales} /> : <p>Cargando . . .</p> }
            </div>

            <Paginacion PokemonPorPagina={pokemonPorPagina}  TotalPokemon ={props.pokemosAll.length}  Paginar = {Paginar} />
            
        </div>
    )


}



function mapStateToProps(state) {
    return {
        pokemosAll: state.pokemosAll
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        getPokemos: dispatch(getPokemos()),
        orderPokemon : (pokemon,order) => dispatch(orderPokemon(pokemon,order)) 
    };
  }
  

export default connect(mapStateToProps, mapDispatchToProps) (Home);