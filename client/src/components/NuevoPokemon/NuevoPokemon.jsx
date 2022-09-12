import React, {useEffect, useState} from 'react';
import './NuevoPokemon.css';
import { connect } from "react-redux";
import { getTypes } from "../../actions/index";
import {validate} from '../../helpers/index';





const NuevoPokemon = (props)=>{

    const [errors, setErrors] = React.useState({});
    const [types,setTypes] = useState([]);
    const [input, setInput] = React.useState({
        name: '',
        vida: '',
        ataque: '',
        defensa: '',
        velocidad: '',
        peso: '',
        altura: '',
      }); 




    useEffect(()=>{

        getTypes();
    },[])


    const handleTypeChange = function (e) {
        setTypes( [...types,e.target.value ] );
      };


    const handleInputChange = function (e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
        setErrors(validate({
          ...input,
          [e.target.name]: e.target.value
        }));
    }



    return (

        <div>
            <h2>Nuevo Pokemon</h2>
            <form className='form-new' action="">
                <table>
                    <tr>
                        <td colSpan={4} >
                            <input className={errors.name ? 'input-error' : 'input-form'} type="text" placeholder='Nombre' name='name' onChange={(e) => handleInputChange(e)} value={input.name} />
                                {errors.name && (
                                    <p className="danger">{errors.name  }</p>
                                )}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} >Estadisticas</td>
                    </tr>
                    <tr>
                        <td>
                            <input className={errors.vida ? 'input-error' : 'input-form'} type="number" name="vida" id="vida"  placeholder='Vida' onChange={(e) => handleInputChange(e)} value={input.vida} />
                            {errors.vida && (
                                    <p className="danger">{errors.vida  }</p>
                                )}
                        </td>
                        <td>
                            <input className='input-form' type="number" name="ataque" id="ataque" placeholder='Ataque' onChange={(e) => handleInputChange(e)} value={input.ataque} />
                            {errors.ataque && (
                                    <p className="danger">{errors.ataque  }</p>
                                )}                 
                        </td>
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
                            <label key={t.name}>
                                <input type="checkbox" id="cbox1" value={t.name} onChange={(e)=>handleTypeChange(e)} /> {t.name}
                            
                            </label>
                        )) : <p>Cargando . . . </p> }
                        </td>
                        
                    </tr>
                    <tr>
                        <td colSpan={4} >
                            {errors.name  || errors.vida ?   <input  className='btn-buscar' disabled type="submit" value="Guardar"   /> : <input  className='btn-buscar' type="submit" value="Guardar"  />}
                           
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