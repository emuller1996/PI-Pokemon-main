import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getPokemos,
  orderPokemon,
  getPokemonByName,
  orderPokemonbyAttack,
  orderPokemonbyVida,
  filterPokemon,
} from "../../actions/index";
import logoPokemon from "../../pokemon-logo.png";

import "./Home.css";
import ListaPokemos from "./ListaPokemos/ListaPokemons";
import Paginacion from "./Paginacion/Paginacion";

import Box from "@mui/material/Box";
import { Button, Grid, Input, MenuItem, Select } from "@mui/material";
import { Container } from "@mui/system";

const Home = (props) => {
  const [order, setOrder] = useState("");
  const [nameBuscar, setNameBuscar] = useState("");
  const [orderBy, setOrderBy] = useState("Name");
  const [render, setRender] = useState(false);
  const [setError] = useState({});
  const [filterPokemon, setFilterPokemon] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);
  const [pokemonPorPagina] = useState(12);

  useEffect(() => {
    try {
      getPokemos();
    } catch (error) {
      setError(error);
    }
  }, [setError]);

  useEffect(() => {
    if (order !== "") {
      if (orderBy === "Name") {
        props.orderPokemon(props.pokemosAll, order);
        setRender(!render);
      }
      if (orderBy === "Attack") {
        props.orderPokemonbyAttack(props.pokemosAll, order);
        setRender(!render);
      }
      if (orderBy === "vida") {
        props.orderPokemonbyVida(props.pokemosAll, order);
        setRender(!render);
      }
    }
  }, [order, orderBy, props.pokemosAll, render]);

  useEffect(() => {
    props.filterPokemon(props.pokemosAll, filterPokemon);
    setRender(!render);
    getPokemos();
  }, [filterPokemon]);

  const UltimoIndice = paginaActual * pokemonPorPagina;
  const PrimerIndice = UltimoIndice - pokemonPorPagina;
  const pokemonsActuales = props.pokemosAll.slice(PrimerIndice, UltimoIndice);

  function Paginar(numeroPagina) {
    setPaginaActual(numeroPagina);
  }

  function handleOrder(e) {
    /* setOrder(e.target.value); */
    /* setOrder('ASC') */
  }

  function BuscarPokemon() {
    props.getPokemonByName(props.pokemosAll, nameBuscar);
  }

  function onChange(e) {
    setNameBuscar(e.target.value);
  }

  function handleSelectChange(e) {
    setOrderBy(e.target.value);
  }

  function handleFilterChange(e) {
    setFilterPokemon(e.target.value);
  }

  return (
    <div>
      <div
        className="container-fluid p-1 mb-4 shadow"
        style={{ backgroundColor: "#1a1e4b" }}
      >
        <div className="row m-0">
          <div className="col-5">
            <span
              className="text-light text-start"
              style={{ fontSize: "0.7em" }}
            >
              <img style={{ width: "1.5em" }} src="/favicon.ico" alt="ICON" />{" "}
              Henry PI PT-07
            </span>
          </div>
          <div className="col-5">
            <span className="text-light " style={{ fontSize: "0.7em" }}>
              Estefano Muller
            </span>
            <a
              href="https://github.com/emuller1996"
              style={{ fontSize: "0.7em" }}
            >
              <i className="fa-brands fa-github ms-2 fa-xl text-warning"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/estefano-m%C3%BCller-3a9b8b237/"
              style={{ fontSize: "0.7em" }}
            >
              <i className="fa-brands fa-linkedin ms-2 fa-xl text-warning"></i>
            </a>
          </div>
        </div>
      </div>

      <Box>
        <img
          style={{ width: "300px" }}
          src={logoPokemon}
          alt="LOGO_POKEMON_NINTENDO"
        />
      </Box>

      <Box
        px={5}
        mx={2}
        mb={3}
        boxShadow={3}
        borderRadius={2}
        py={2}
        bgcolor={"#1a1e4b"}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} my={"auto"}>
            <Button fullWidth variant="contained">
              <i className="fa-solid fa-circle-plus me-2"></i>
              New Pokemons
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Input
              fullWidth
              placeholder="Search Pokemon"
              style={{
                backgroundColor: "#d5daea",
                borderRadius: "0.3em 0.3em",
                color: "#1a1e4b",
                padding: "0.2em",
                overflow: "hidden",
              }}
            />
          </Grid>
          <Grid item xs={12} md={3} my={"auto"}>
            <Button fullWidth variant="contained">
              Search
            </Button>
          </Grid>
          <Grid item xs={12} md={4} my={"auto"}>
            <span className="me-2">Sort</span>
            <Button className="me-2" variant="contained" onClick={handleOrder}>
              <i className="fa-solid fa-arrow-up-short-wide "></i>
            </Button>
            <span className="ms-2">By </span>

            <Select
              variant="standard"
              color="primary"
              value={orderBy}
              displayEmpty
              onChange={handleSelectChange}
            >
              <MenuItem value={"Name"}>Name</MenuItem>
              <MenuItem value={"vida"}>Hp</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Box>

      {/* <div className="nav-content">
        <div className="row">
          <Link to="/create" className="btn-buscar">
            {" "}
            <i className="fas fa-plus-circle"></i> Nuevo Pokemon
          </Link>
          <input
            onChange={onChange}
            id="buscar_p"
            type="text"
            placeholder="Nombre del pokemon"
            className="input-buscar"
          />
          <button onClick={BuscarPokemon} className="btn-buscar">
            {" "}
            <i className="fas fa-search"></i> Buscar
          </button>
        </div>
        <div className="row">
          <div>
            <span>Order By </span>
            <select
              className="select "
              id="orderBy"
              name=""
              onChange={handleSelectChange}
            >
              <option value="Name">Name</option>
              <option value="Attack">Attack</option>
              <option value="vida">Vida</option>
            </select>

            <select className="select " id="order" name="" onChange={handleOrder}>
              <option value="ASC"> ASC</option>
              <option value="DESC">DESC</option>
            </select>
          </div>

          <div>
            <span>Filter By </span>
            <select
              className="select"
              name="filter"
              id="filter"
              onChange={handleFilterChange}
            >
              <option value="Todos">Todos</option>
              <option
                disabled={filterPokemon === "Existentes" ? true : false}
                value="Creados"
              >
                Creados
              </option>
              <option
                disabled={filterPokemon === "Creados" ? true : false}
                value="Existentes"
              >
                Existentes
              </option>
            </select>
          </div>
        </div>
      </div> */}

      <Container /* className="container-card" */>
        {props.pokemosAll ? (
          <ListaPokemos pokemons={pokemonsActuales} />
        ) : (
          <p>Cargando . . .</p>
        )}
      </Container>

      <Paginacion
        PokemonPorPagina={pokemonPorPagina}
        TotalPokemon={props.pokemosAll.length}
        Paginar={Paginar}
      />

      <div
        className="container-fluid p-1 mb-4 shadow"
        style={{ backgroundColor: "#1a1e4b" }}
      >
        <div className="row m-0">
          <div className="col-4">
            <span
              className="text-light text-start"
              style={{ fontSize: "0.7em" }}
            >
              <img style={{ width: "1.5em" }} src="/favicon.ico" alt="ICON" />{" "}
              Henry PI PT-07
            </span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    pokemosAll: state.pokemosAll,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPokemos: dispatch(getPokemos()),
    orderPokemon: (pokemon, order) => dispatch(orderPokemon(pokemon, order)),
    getPokemonByName: (pokemons, name) =>
      dispatch(getPokemonByName(pokemons, name)),
    orderPokemonbyAttack: (pokemon, order) =>
      dispatch(orderPokemonbyAttack(pokemon, order)),
    orderPokemonbyVida: (pokemon, order) =>
      dispatch(orderPokemonbyVida(pokemon, order)),
    filterPokemon: (pokemon, filter) =>
      dispatch(filterPokemon(pokemon, filter)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
