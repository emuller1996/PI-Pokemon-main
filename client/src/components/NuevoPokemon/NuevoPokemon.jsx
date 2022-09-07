import React, {useEffect} from 'react';
import './NuevoPokemon.css';
import { connect } from "react-redux";
import { getTypes } from "../../actions/index";


const NuevoPokemon = (props)=>{


    useEffect(()=>{

        getTypes();
    },[])

    return (

        <div>
            <h2>Nuevo Pokemon</h2>
            <form className='form-new' action="">
                <table>
                    <tr>
                        <td colSpan={4} ><input className='input-form' type="text" placeholder='Nombre '/></td>
                    </tr>
                    <tr>
                        <td colSpan={4} >Estadisticas</td>
                    </tr>
                    <tr>
                        <td><input className='input-form' type="number" name="vida" id="vida"  placeholder='Vida' /></td>
                        <td><input className='input-form' type="number" name="ataque" id="ataque" placeholder='Ataque'/></td>
                        <td><input className='input-form' type="number" name="defensa" id="defensa" placeholder='defensa'/></td>
                        <td><input className='input-form' type="number" name="velocidad" id="velocidad" placeholder='velocidad'/></td>


                    </tr>
                    <tr>
                        <td colSpan={2} ><input className='input-form' type="number" name="peso" id="peso" placeholder='Peso'/></td>
                        <td colSpan={2} ><input className='input-form' type="number" name="altura" id="altura" placeholder='Altura'/></td>

                    </tr>
                    <tr>
                        <td colSpan={4} >Tipo</td>
                    </tr>
                    <tr>
                        <td colSpan={4}>

                        {props.types.length !== 0 ? props.types.map(t => (
                            <label><input type="checkbox" id="cbox1" value={t.name} /> {t.name}</label>
                        )) : <p>Cargando . . . </p> }
                        </td>
                        
                    </tr>
                    <tr>
                        <td colSpan={4} >
                            <input className='btn-buscar' type="button" value="Guardar" />
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        types: state.types
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        getTypes: dispatch(getTypes())
        
    };
  }

export default  connect(mapStateToProps, mapDispatchToProps) (NuevoPokemon);