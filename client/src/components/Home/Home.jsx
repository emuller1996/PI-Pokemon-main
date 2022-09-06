import React, {useEffect,useState} from 'react';
import { connect } from "react-redux";
import { getPokemos, orderPokemon } from "../../actions/index";
import CardPokemon from './CardPokemon/CardPokemon';
import {Link,NavLink} from 'react-router-dom';

import './Home.css';
import ListaPokemos from './ListaPokemos/ListaPokemons';

const Home = (props)=>{

    const [order,setOrder] = useState('');


    useEffect(  ()=>{
        console.log("Did Mount");   
        getPokemos();
            
        console.log(props.pokemosAll);

        
           
        
    },[]);



    function orderASC(){
        console.log('order ASC')
        props.orderPokemon(props.pokemosAll,'ASC');
        setOrder('ASC')
        console.log(props.pokemosAll);
    }
    function orderDESC(){
        console.log('order DESC')
        props.orderPokemon(props.pokemosAll,'DESC');
        setOrder('DESC')
        console.log(props.pokemosAll);
    }


    return (
        <div>
            <h1>Home Pokemon</h1>
            <div className='nav-content'>
                <div className='row' >
                <Link to='pokemon/create' className='btn-buscar'> <i className="fas fa-plus-circle"></i> Nuevo Pokemon</Link>
                    <input  id='buscar_p' type="text" placeholder="Nombre del pokemon"  className='input-buscar'/>
                    <button className='btn-buscar'> <i className="fas fa-search"></i> Buscar</button>
                    
                </div>
                <div className='row'>
                <button onClick={()=>{ orderASC() }} className='btn-buscar'> <i className="fas fa-sort-alpha-down"></i> ASC</button>
                <button onClick={orderDESC} className='btn-buscar'> <i className="fas fa-sort-alpha-down-alt"></i> DESC</button>

                    
                </div>

            </div>
            
            
            <div className='container-card'>

            {props.pokemosAll ? <ListaPokemos pokemons={props.pokemosAll} /> : <p>Cargando . . .</p> }
            </div>
            
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