import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemos,
  orderPokemon,
  getPokemonByName,
  orderPokemonbyAttack,
  orderPokemonbyVida,
  filterPokemon as filterbyOrigin,
  getTypes,
  filterPokemonByType
} from "../../actions/index";

import "./Home.css";
import ListaPokemos from "./ListaPokemos/ListaPokemons";
import Paginacion from "./Paginacion/Paginacion";

import Box from "@mui/material/Box";
import { Button, CircularProgress, Grid, Input, MenuItem, Select } from "@mui/material";
import { Container } from "@mui/system";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  //states
  const [order, setOrder] = useState("ASC");
  const [nameBuscar, setNameBuscar] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [filterPokemon, setFilterPokemon] = useState("");
  const [filterPokemonByTypes, setFilterPokemonByTypes] = useState("");


  const [paginaActual, setPaginaActual] = useState(1);
  const [pokemonPorPagina] = useState(12);

  const pokemonsAll = useSelector((state) => state.pokemosAll);
  const typesAll = useSelector((state) => state.types);
  const dispatch = useDispatch();

  //useEffects
  useEffect(() => {
    dispatch(getTypes())
    try {
      dispatch(getPokemos());
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (order !== "") {
      if (orderBy === "Name") {
        dispatch(orderPokemon(pokemonsAll, order));
      }
      if (orderBy === "Attack") {
        dispatch(orderPokemonbyAttack(pokemonsAll, order));
      }
      if (orderBy === "vida") {
        dispatch(orderPokemonbyVida(pokemonsAll, order));
      }
    }
  }, [order, orderBy, dispatch, pokemonsAll]);

  useEffect(() => {
    dispatch(filterbyOrigin(pokemonsAll, filterPokemon));
  }, [filterPokemon]);


  useEffect(() => {

    if (filterPokemonByTypes !== "") dispatch(filterPokemonByType(pokemonsAll, filterPokemonByTypes));
  }, [filterPokemonByTypes])

  //paginacion

  const UltimoIndice = paginaActual * pokemonPorPagina;
  const PrimerIndice = UltimoIndice - pokemonPorPagina;
  const pokemonsActuales = pokemonsAll.slice(PrimerIndice, UltimoIndice);

  function Paginar(numeroPagina) {
    setPaginaActual(numeroPagina);
  }

  //Functions

  function handleOrder(e) {
    /* setOrder(e.target.value); */
    /* setOrder('ASC') */
    setOrder(e);
  }

  function BuscarPokemon() {
    if (nameBuscar === "") {
      dispatch(getPokemos());
    } else {
      dispatch(getPokemonByName(pokemonsAll, nameBuscar));
    }
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
  function handleFilterByType(e) {
    setFilterPokemonByTypes(e.target.value)
  }

  return (
    <div>
      <Navbar />

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
            <Link to="/create">
              <Button fullWidth variant="contained">
                <i className="fa-solid fa-circle-plus me-2"></i>
                New Pokemons
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Input
              fullWidth
              placeholder="Search Pokemon"
              onChange={onChange}
              className="text-blue-p"
              style={{
                backgroundColor: "#d5daea",
                borderRadius: "0.3em 0.3em",
                fontWeight: 'semibold',
                padding: "0.2em",
                overflow: "hidden",
              }}
            />
          </Grid>
          <Grid item xs={12} md={3} my={"auto"}>
            <Button fullWidth variant="contained" onClick={BuscarPokemon}>
              Search
            </Button>
          </Grid>
          <Grid item xs={12} md={4} my={"auto"}>
            <span className="mx-2">Sort</span>
            {order === "ASC" && (
              <Button
                className="me-2"
                variant="contained"
                onClick={() => handleOrder("DESC")}
              >
                <i className="fa-solid fa-arrow-up-wide-short"></i>
              </Button>
            )}
            {order === "DESC" && (
              <Button
                className="me-2"
                variant="contained"
                onClick={() => handleOrder("ASC")}
              >
                <i className="fa-solid fa-arrow-up-short-wide "></i>
              </Button>
            )}

            <span className="ms-2">By </span>

            <Select
              variant="standard"
              color="primary"
              value={orderBy}
              displayEmpty
              onChange={handleSelectChange}
              className="text-blue-p"
            >
              <MenuItem className="text-blue-p" value={"Name"}>Name</MenuItem>
              <MenuItem className="text-blue-p" value={"vida"}>Hp</MenuItem>
              <MenuItem className="text-blue-p" value={"Attack"}>Attack</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={4} my={"auto"}>
            <span className="mx-2 text-white"> Filter </span>

            <Select
              variant="standard"
              color="primary"
              displayEmpty
              onChange={handleFilterChange}
              className="text-blue-p text-white"
            >
              <MenuItem className="text-blue-p" value={"All"}>All</MenuItem>
              <MenuItem disabled={filterPokemon === "Existing" ? true : false} className="text-blue-p" value={"Created"}>Created</MenuItem>
              <MenuItem disabled={filterPokemon === "Created" ? true : false} className="text-blue-p" value={"Existing"}>Existing</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} md={4} my={"auto"}>
            <span className="mx-2 text-white"> Filter by Type </span>

            <Select
              variant="standard"
              color="primary"
              displayEmpty
              onChange={handleFilterByType}
              className="text-blue-p text-white"
            >
              {
                typesAll && typesAll.map(t => (<MenuItem key={t.id} className="text-blue-p" value={t.name}>{t.name}</MenuItem>))
              }
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
        {pokemonsAll !== 0 ? (
          <ListaPokemos pokemons={pokemonsActuales} />
        ) : <CircularProgress />
        }
        {
          filterPokemonByTypes && pokemonsAll.length === 0 && (
            <p>no hay pokemons</p>
          )
        }


      </Container>


      <Paginacion
        PokemonPorPagina={pokemonPorPagina}
        TotalPokemon={pokemonsAll.length}
        Paginar={Paginar}
      />

      <Footer />
    </div>
  );
};

/* function mapDispatchToProps(dispatch) {
  return {
    orderPokemon: (pokemon, order) => dispatch(orderPokemon(pokemon, order)),
    filterPokemon: (pokemon, filter) =>
      dispatch(filterPokemon(pokemon, filter)),
  };
} */

export default Home;
