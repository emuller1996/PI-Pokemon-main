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
import {
  Button,
  Grid,
  Input,
  MenuItem,
  Select,
} from "@mui/material";
import { Container } from "@mui/system";

const Home = (props) => {
  const [order, setOrder] = useState("");
  const [nameBuscar, setNameBuscar] = useState("");
  const [orderBy, setOrderBy] = useState("Name");
  const [render, setRender] = useState(false);
  const [error, setError] = useState({});
  const [filterPokemon, setFilterPokemon] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);
  const [pokemonPorPagina, setPokemonPorPagina] = useState(12);

  useEffect(() => {
    try {
      getPokemos();
    } catch (error) {
      setError(error);
    }
  }, []);

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
  }, [order, orderBy, props.pokemosAll]);

  useEffect(() => {
    console.log("filterUpdate");

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
    setOrder(e.target.value);
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
      <Box>
        <img
          style={{ width: "300px" }}
          src={logoPokemon}
          alt="LOGO_POKEMON_NINTENDO"
        />
      </Box>

      <Box
        px={5}
        mx={4}
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
            <Button className="me-2" variant="contained">
              <i class="fa-solid fa-arrow-up-short-wide "></i>
            </Button>
            <span className="ms-2">By </span>
            
              <Select
                variant="standard"
                color="primary"
                displayEmpty
            
              >
                
                <MenuItem color="#1a1e4b" value={10}>HP</MenuItem>
                <MenuItem value={20}>Attack</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
              class="select "
              id="orderBy"
              name=""
              onChange={handleSelectChange}
            >
              <option value="Name">Name</option>
              <option value="Attack">Attack</option>
              <option value="vida">Vida</option>
            </select>

            <select class="select " id="order" name="" onChange={handleOrder}>
              <option value="ASC"> ASC</option>
              <option value="DESC">DESC</option>
            </select>
          </div>

          <div>
            <span>Filter By </span>
            <select
              class="select"
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

      <Container  /* className="container-card" */>
        {props.pokemosAll ? (
          <ListaPokemos pokemons={pokemonsActuales} />
        ) : (
          <p>Cargando . . .</p>
        )}
      </Container >

      <Paginacion
        PokemonPorPagina={pokemonPorPagina}
        TotalPokemon={props.pokemosAll.length}
        Paginar={Paginar}
      />
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
