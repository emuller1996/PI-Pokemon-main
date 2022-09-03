import React, {useEffect} from 'react';
import { connect } from "react-redux";
import { getPokemos } from "../../actions/index";


const Home = (props)=>{

    useEffect(  ()=>{
        console.log("Did Mount");
         getPokemos();

        console.log(props.pokemosAll);
    },[props.pokemosAll]);




    return (
        <div>
            <h1>Home Pokemon</h1>
            <div className='' >
                <label htmlFor="buscar_p">Buscar : </label>
                <input  id='buscar_p' type="text" placeholder="Nombre del pokemon" />
                
            </div>
            
            {props.pokemosAll && props.pokemosAll.map( pokemos=>(
                <li> {pokemos.name}</li>
            ))}
            
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
    };
  }
  

export default connect(mapStateToProps, mapDispatchToProps) (Home);