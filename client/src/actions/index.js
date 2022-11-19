import axios from "axios";
import { compare_name, compare_attack, compare_vida } from "../helpers/index";
import { validate } from "uuid";

export const GET_POKEMOS = "GET_POKEMOS";
export const GET_POKEMOS_DETALLE = "GET_POKEMOS_DETALLE";
export const ORDER_POKEMON_BY_NAME = "ORDER_POKEMON_BY_NAME";
export const ORDER_POKEMON_BY_ATTACK = "ORDER_POKEMON_BY_ATTACK";
export const ORDER_POKEMON_BY_HP = "ORDER_POKEMON_BY_HP";

export const GET_TYPES = "GET_TYPES";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const FILTER_POKEMON = "FILTER_POKEMON";
export const FILTER_POKEMON_BY_TYPES = "FILTER_POKEMON_BY_TYPES";

export const CHANGE_ORDER = "CHANGE_ORDER";

export function getPokemos() {
  return async function (dispatch) {
    /* return  fetch("http://localhost:3001/pokemon")
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: GET_POKEMOS, payload: json.pokemons });
        }); */

    const result = await axios.get("/pokemons");
    return dispatch({ type: GET_POKEMOS, payload: result.data.pokemons });
  };
}

export function getPokemonDetalle(id) {
  return async function (dispatch) {
    const result = await axios.get(`/pokemons/${id}`);
    return dispatch({
      type: GET_POKEMOS_DETALLE,
      payload: result.data.pokemon,
    });
  };
}

export function changeOrder(order) {
  return function (dispatch) {
    return dispatch({ type: CHANGE_ORDER, payload: order });
  };
}

export function orderPokemon(Pokemon, order) {
  return function (dispatch) {
    Pokemon.sort(compare_name);
    if (order === "ASC") {
      return dispatch({ type: ORDER_POKEMON_BY_NAME, payload: Pokemon });
    } else if (order === "DESC") {
      return dispatch({
        type: ORDER_POKEMON_BY_NAME,
        payload: Pokemon.reverse(),
      });
    }
  };
}

export function orderPokemonbyAttack(Pokemon, order) {
  return function (dispatch) {
    Pokemon.sort(compare_attack);
    if (order === "ASC") {
      return dispatch({ type: ORDER_POKEMON_BY_ATTACK, payload: Pokemon });
    } else if (order === "DESC") {
      return dispatch({
        type: ORDER_POKEMON_BY_ATTACK,
        payload: Pokemon.reverse(),
      });
    }
  };
}

export function orderPokemonbyVida(Pokemon, order) {
  return function (dispatch) {
    Pokemon.sort(compare_vida);

    if (order === "ASC") {
      return dispatch({ type: ORDER_POKEMON_BY_HP, payload: Pokemon });
    } else if (order === "DESC") {
      return dispatch({
        type: ORDER_POKEMON_BY_HP,
        payload: Pokemon.reverse(),
      });
    }
  };
}

export function getTypes() {
  return async function (dispatch) {
    const result = await axios.get("/types");
    return dispatch({ type: GET_TYPES, payload: result.data.types });
  };
}

export function getPokemonByName(pokemons, name) {
  return function (dispatch) {
    return dispatch({
      type: GET_POKEMON_BY_NAME,
      payload: pokemons.filter((p) => p.name === name),
    });
  };
}

export function filterPokemon(pokemons, filter) {
  return async function (dispatch) {
    if (filter === "Created") {
      return dispatch({
        type: FILTER_POKEMON,
        payload: pokemons.filter((p) => validate(p.id)),
      });
    }
    if (filter === "Existing") {
      return dispatch({
        type: FILTER_POKEMON,
        payload: pokemons.filter((p) => typeof p.id === "number"),
      });
    }
    if (filter === "All") {
      const result = await axios.get("/pokemons");
      return dispatch({ type: GET_POKEMOS, payload: result.data.pokemons });
    }
  };
}

export function filterPokemonByType(pokemons, type) {
  return async function (dispatch) {
    var pokemonFilteredType = pokemons.filter((p) => {
      if (typeof p.id === "number") {
        let entro = false;
        p.types.forEach((t) => {
          if (t.type.name === type) entro = true;
        });
        if (entro) return p;
      }else{
        let entro = false;
        p.types.forEach((t) => {
          if (t.name === type) entro = true;
        });
        if (entro) return p;

      }
    });

    console.log(pokemonFilteredType);

    return dispatch({
      type: FILTER_POKEMON_BY_TYPES,
      payload: pokemonFilteredType,
    });
  };
}
