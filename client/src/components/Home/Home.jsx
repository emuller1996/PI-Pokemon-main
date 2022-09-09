import React, {useEffect,useState} from 'react';
import { connect } from "react-redux";
import { getPokemos, orderPokemon,getPokemonByName , changeOrder, orderPokemonbyAttack} from "../../actions/index";
import {Link} from 'react-router-dom';

import './Home.css';
import ListaPokemos from './ListaPokemos/ListaPokemons';
import Paginacion from './Paginacion/Paginacion';

const Home = (props)=>{

    const [order,setOrder] = useState('');
    const [nameBuscar,setNameBuscar] = useState('');
    const [orderBy,setOrderBy] = useState('Name');
    const [render,setRender] = useState(0);

    const [paginaActual,setPaginaActual] = useState(1);
    const [pokemonPorPagina,setPokemonPorPagina] = useState(12);
  
    useEffect(  ()=>{  
        getPokemos();
    },[props.pokemosAll]);
  
    const UltimoIndice = paginaActual * pokemonPorPagina;
    const PrimerIndice =  UltimoIndice - pokemonPorPagina;
    const pokemonsActuales =  props.pokemosAll.slice(PrimerIndice,UltimoIndice);


    function Paginar (numeroPagina){
        setPaginaActual(numeroPagina);
    }

    function orderASC(){
        setRender(render+1); 
        setOrder('ASC')

        
        if(orderBy === 'Name') props.orderPokemon(props.pokemosAll,order);  
        if(orderBy === 'Attack') props.orderPokemonbyAttack(props.pokemosAll,order);  
        
    }
    function orderDESC(){
        setRender(render+1); 
        setOrder('DESC')
        if(orderBy === 'Name') props.orderPokemon(props.pokemosAll,order);  
        if(orderBy === 'Attack') props.orderPokemonbyAttack(props.pokemosAll,order);  
        
        

                          
    }

  
    

    function BuscarPokemon (){
        props.getPokemonByName(props.pokemosAll,nameBuscar);     
    }

    function onChange(e){
        setNameBuscar(e.target.value)
    }

    function handleSelectChange(e){
        setOrderBy(e.target.value);
    }


    return (
        <div>
            <h1>HOME POKEMON APP</h1>
            <div className='nav-content'>
                <div className='row' >
                <Link to='/create' className='btn-buscar'> <i className="fas fa-plus-circle"></i> Nuevo Pokemon</Link>
                    <input  onChange={onChange} id='buscar_p' type="text" placeholder="Nombre del pokemon"  className='input-buscar'/>
                    <button  onClick={BuscarPokemon} className='btn-buscar'> <i className="fas fa-search"></i> Buscar</button>
                    
                </div>
                <div className='row'>
                <div>
                    <button onClick={()=>{ orderASC();  }} className='btn-buscar' name='ASC' > <i className="fas fa-sort-alpha-down"></i> ASC</button>
                    <button onClick={orderDESC} className='btn-buscar' name='DESC' > <i className="fas fa-sort-alpha-down-alt"></i> DESC</button>
                    <select class="order-select btn-buscar" id="order" name='' onChange={handleSelectChange}>
                        <option value="Name">Name</option>
                        <option value="Attack">Attack</option>
                    </select>
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
        orderPokemon : (pokemon,order) => dispatch(orderPokemon(pokemon,order)),
        getPokemonByName : (pokemons,name) => dispatch(getPokemonByName(pokemons,name)),
        orderPokemonbyAttack : (pokemon,order) => dispatch(orderPokemonbyAttack(pokemon,order))
    };
  }
  

export default connect(mapStateToProps, mapDispatchToProps) (Home);