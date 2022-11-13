import React, { useEffect, useState } from 'react';
import './NuevoPokemon.css';
import { connect } from "react-redux";
import { getTypes } from "../../actions/index";
import { validateName, validateStast } from '../../helpers/index';

import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { TextField } from '@mui/material';





const NuevoPokemon = (props) => {

    const [errors, setErrors] = React.useState({});
    const [types, setTypes] = useState([]);
    const [name, setName] = React.useState({
        name: '',
    });
    const [stats, setStats] = React.useState({
        /* vida: 0,
        ataque: 0,
        defensa: 0,
        velocidad: 0,
        peso: 0,
        altura: 0, */
    });

    const [response, setResponse] = useState(false);




    useEffect(() => {

        getTypes();
    }, [response])


    const handleTypeChange = function (e) {
        if (e.target.checked) {
            setTypes([...types, { id: e.target.value, name: e.target.name }]);
            e.target.checked = true;
            e.target.disabled = true;
        }
    };


    const handleInputChange = function (event) {
        console.log(event.target.value)
        setName({
            ...name,
            [event.target.name]: event.target.value
        });
        setErrors(validateName({
            ...name,
            [event.target.name]: event.target.value
        }));
    }

    const handleStatsChange = function (e) {
        setStats({
            ...stats,
            [e.target.name]: parseInt(e.target.value, 10)
        });

        setErrors(validateName({
            ...stats, ...name,
            [e.target.name]: e.target.value
        }));



    }


    const onSubmit = async function (e) {
        e.preventDefault();


        const ob = Object.assign(name, stats, { types })
        console.log(ob);

        try {

            const r = await fetch('http://localhost:3001/pokemons', {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(ob), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            setResponse(r.ok)
            setName({
                name: '',
            });
            setStats({
                vida: '',
                ataque: '',
                defensa: '',
                velocidad: '',
                peso: '',
                altura: '',
            });
            setTypes([]);

        } catch (error) {
            console.log(error);
        }








    }



    return (

        <div>


            <Navbar />
            <div className="container border shadow  blue-60 shadow rounded py-4">
                <h2>Nuevo Pokemon</h2>
                <form className='' action="" onSubmit={onSubmit} autocomplete="off">

                    <div className="row m-0 p-0">
                        <div className="col-12 ">
                            <TextField error={errors.name ? true : false} helperText={errors.name} onChange={handleInputChange} value={name.name} fullWidth required id="name" name='name' label="name pokemon" variant="outlined" />
                        </div>
                        <div className="col-6">
                            <TextField error={errors.vida ? true : false} helperText={errors.vida} onChange={handleStatsChange} value={stats.vida} fullWidth id="vida" name='vida' label="Hp" type="number" variant="outlined" />

                        </div>
                        <div className="col-5">
                            <TextField error={errors.ataque ? true : false} helperText={errors.ataque} onChange={handleStatsChange} value={stats.ataque} fullWidth id="ataque" name='ataque' label="Attack" type="number" variant="outlined" />

                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th colSpan={4}>
                                    {response ? (
                                        <div className='card-message'>
                                            <div className='title-message' >  <i className="fas fa-thumbs-up"></i> Pokemon Agregado. </div>
                                            <div className='body-message' > El Pokemon ha sido ingresado correctamente en la base de datos. </div>
                                        </div>

                                    ) : 'Ingrese los datos del pokemon nuevo.'}

                                </th>
                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={4} >
                                    <label htmlFor="name">Nombre : </label>
                                    <input className={errors.name ? 'input-error' : 'input-form'} type="text" placeholder='Pika Pika' name='name' onChange={(e) => handleInputChange(e)} value={name.name} />
                                    {errors.name && (
                                        <span className="danger">{errors.name}</span>
                                    )}
                                </td>

                            </tr>

                            <tr>
                                <td>
                                    <label htmlFor="">Vida : </label>
                                    <input className={errors.vida ? 'input-error' : 'input-form'} type="number" name="vida" id="vida" placeholder='1-100' onChange={(e) => handleStatsChange(e)} value={stats.vida} />
                                    {errors.vida && (
                                        <span className="danger">{errors.vida}</span>
                                    )}
                                </td>
                                <td>
                                    <label htmlFor="">Ataque : </label>
                                    <input className={errors.ataque ? 'input-error' : 'input-form'} type="number" name="ataque" id="ataque" placeholder='1-100' onChange={(e) => handleStatsChange(e)} value={stats.ataque} />
                                    {errors.ataque && (
                                        <p className="danger">{errors.ataque}</p>
                                    )}
                                </td>



                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="">Defensa : </label>
                                    <input className={errors.defensa ? 'input-error' : 'input-form'} type="number" name="defensa" id="defensa" placeholder='1-100' onChange={(e) => handleStatsChange(e)} value={stats.defensa} />
                                </td>
                                <td>
                                    <label htmlFor="">Velocidad : </label>
                                    <input className={errors.velocidad ? 'input-error' : 'input-form'} type="number" name="velocidad" id="velocidad" placeholder='1-100' onChange={(e) => handleStatsChange(e)} value={stats.velocidad} />
                                </td>

                            </tr>
                            <tr>
                                <td >
                                    <label htmlFor="">Peso : </label>
                                    <input className={errors.peso ? 'input-error' : 'input-form'} type="number" name="peso" id="peso" placeholder='1-1000' onChange={(e) => handleStatsChange(e)} value={stats.peso} />
                                </td>
                                <td >
                                    <label htmlFor="">Altura : </label>
                                    <input className={errors.altura ? 'input-error' : 'input-form'} type="number" name="altura" id="altura" placeholder='1-22' onChange={(e) => handleStatsChange(e)} value={stats.altura} />
                                </td>

                            </tr>
                            <tr>
                                <td colSpan={4} >Tipo</td>
                            </tr>
                            <tr>
                                <td colSpan={4}>
                                    <div className="types-content">
                                        {props.types.length !== 0 ? props.types.map(t => (
                                            <label key={t.name}>
                                                <input type="checkbox" id="cbox1" value={t.id} name={t.name} onChange={(e) => handleTypeChange(e)} /> {t.name}

                                            </label>
                                        )) : <p>Cargando . . . </p>}

                                    </div>

                                </td>

                            </tr>
                            <tr>
                                <td colSpan={4} >
                                    {Object.values(errors).length !== 0 ? <input className='btn-buscar' disabled type="submit" value="Guardar" /> : <input className='btn-buscar' type="submit" value="Guardar" />}

                                </td>
                            </tr>



                        </tbody>

                    </table>

                </form>
            </div>

            <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(NuevoPokemon);