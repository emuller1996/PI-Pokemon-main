import { CircularProgress, Grid, LinearProgress } from '@mui/material';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { getPokemonDetalle } from "../../actions/index";
import spiner from '../../Spinner-5.gif';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import './PokemonDetalle.css';


const PokemonDetalle = (props) => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    const pokemonDetalle = useSelector(state => state.pokemonDetalle);

    useEffect(() => {
        dispatch(getPokemonDetalle(id));
    }, [dispatch, id])




    if (!pokemonDetalle.name) {
        return (
            <CircularProgress />
        )
    } else {
        return (
            <>
                <Navbar />

                <div

                    className="container border shadow  blue-60 shadow rounded py-4"
                >
                    <div className="float-end px-3">
                        <button onClick={() => history.goBack()} className="btn btn-light text-blue-p"><i className="fa-solid fa-arrow-left fa-xl"></i></button>
                    </div>
                    <div className="row g-0 m-0">

                        <div className="col-md-4">
                            <img style={{ width: '15em' }} src={pokemonDetalle.sprites ? pokemonDetalle.sprites.other.dream_world.front_default : pokemonDetalle.img} alt="asd" />
                        </div>
                        <div className="col-md-7 ">
                            <p className="fs-1 text-blue-p"> {pokemonDetalle.name && pokemonDetalle.name}</p>
                            <div className="  text-center   p-2 ">
                                <p className="fs-5 text-blue-p mx-4">Stats</p>
                                <Grid container spacing={2} alignItems="center">

                                    {pokemonDetalle.stats ? pokemonDetalle.stats.map(stat =>
                                    (
                                        < Fragment key={stat.stat.name}>
                                            <Grid key={stat.stat.name} item xs={5}>
                                                <span className="text-uppercase ">{stat.stat.name}</span>
                                            </Grid>
                                            <Grid key={stat.base_stat} item xs={7}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={stat.base_stat}
                                                    style={{ padding: "0.4em", borderRadius: '0.3em' }}
                                                />
                                            </Grid>
                                        </Fragment>

                                    )) : (

                                        < Fragment>
                                            <Grid  item xs={5}>
                                                <span className="text-uppercase ">HP</span>
                                            </Grid>
                                            <Grid  item xs={7}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={pokemonDetalle.vida}
                                                    style={{ padding: "0.4em", borderRadius: '0.3em' }}
                                                />
                                            </Grid>

                                            <Grid  item xs={5}>
                                                <span className="text-uppercase ">Attack</span>
                                            </Grid>
                                            <Grid  item xs={7}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={pokemonDetalle.ataque}
                                                    style={{ padding: "0.4em", borderRadius: '0.3em' }}
                                                />
                                            </Grid>

                                            <Grid  item xs={5}>
                                                <span className="text-uppercase ">DEFENSE</span>
                                            </Grid>
                                            <Grid  item xs={7}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={pokemonDetalle.defensa}
                                                    style={{ padding: "0.4em", borderRadius: '0.3em' }}
                                                />
                                            </Grid>

                                            <Grid  item xs={5}>
                                                <span className="text-uppercase ">SPEED</span>
                                            </Grid>
                                            <Grid  item xs={7}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={pokemonDetalle.velocidad}
                                                    style={{ padding: "0.4em", borderRadius: '0.3em' }}
                                                />
                                            </Grid>
                                        </Fragment>
                                    )}



                                </Grid>
                            </div>

                        </div>
                    </div>

                </div>

                <Footer />
            </>
        )
    }


}



export default PokemonDetalle;

