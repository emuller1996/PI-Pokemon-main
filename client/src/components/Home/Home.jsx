import React, {useEffect,useState} from 'react';
import { connect } from "react-redux";
import { getPokemos, orderPokemon,getPokemonByName , changeOrder, orderPokemonbyAttack, filterPokemon} from "../../actions/index";
import {Link} from 'react-router-dom';
import logoPokemon from '../../pokemon-logo.png';

import './Home.css';
import ListaPokemos from './ListaPokemos/ListaPokemons';
import Paginacion from './Paginacion/Paginacion';

const Home = (props)=>{

    const [order,setOrder] = useState('');
    const [nameBuscar,setNameBuscar] = useState('');
    const [orderBy,setOrderBy] = useState('Name');
    const [render,setRender] = useState(false);
    const [error,setError] = useState({});
    const [filterPokemon,setFilterPokemon] = useState('');

    const [paginaActual,setPaginaActual] = useState(1);
    const [pokemonPorPagina,setPokemonPorPagina] = useState(12);
  
    useEffect(  ()=>{  

        try {
            getPokemos();
            
        } catch (error) {
            setError(error);
        }
        
    },[]);


    useEffect(  ()=>{          
        if(order!==''){
            if(orderBy === 'Name') {
                props.orderPokemon(props.pokemosAll,order);  
                setRender(!render);             
            }
            if(orderBy === 'Attack'){
                props.orderPokemonbyAttack(props.pokemosAll,order); 
                setRender(!render); 
            }            
        }      
    },[order,orderBy,props.pokemosAll]);

    useEffect(  ()=>{
        
        console.log('filterUpdate')
          
        props.filterPokemon(props.pokemosAll,filterPokemon);
        setRender(!render); 
        getPokemos();  

    },[filterPokemon])



  
    const UltimoIndice = paginaActual * pokemonPorPagina;
    const PrimerIndice =  UltimoIndice - pokemonPorPagina;
    const pokemonsActuales =  props.pokemosAll.slice(PrimerIndice,UltimoIndice);


    function Paginar (numeroPagina){
        setPaginaActual(numeroPagina);
    }

    function orderASC(){ setOrder('ASC') }
    function orderDESC(){setOrder('DESC') }

    function BuscarPokemon (){ props.getPokemonByName(props.pokemosAll,nameBuscar); }

    function onChange(e){ setNameBuscar(e.target.value) }

    function handleSelectChange(e){
        setOrderBy(e.target.value);
    }

    function handleFilterChange(e){ 
         
        setFilterPokemon(e.target.value) }


    return (
        <div>
            <img src={logoPokemon} alt="LOGO_POKEMON_NINTENDO" />
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
                
                <select class="filter-select" name="filter" id="filter" onChange={handleFilterChange}>
                    <option value="Todos">Todos</option>
                    <option disabled={filterPokemon === 'Existentes' ? true : false} value="Creados">Creados</option>
                    <option disabled={filterPokemon === 'Creados' ? true : false} value="Existentes" >Existentes</option>

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
        orderPokemonbyAttack : (pokemon,order) => dispatch(orderPokemonbyAttack(pokemon,order)),
        filterPokemon : (pokemon,filter) => dispatch(filterPokemon(pokemon,filter))

    };
  }
  

export default connect(mapStateToProps, mapDispatchToProps) (Home);