import axios from 'axios';


export const GET_POKEMOS = "GET_POKEMOS";
export const GET_POKEMOS_DETALLE = "GET_POKEMOS_DETALLE";
export const ORDER_POKEMON = 'ORDER_POKEMON';
export const GET_TYPES = 'GET_TYPES';
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";




export function  getPokemos() {
    return async function (dispatch) {
      /* return  fetch("http://localhost:3001/pokemon")
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: GET_POKEMOS, payload: json.pokemons });
        }); */

        const result = await axios.get("http://localhost:3001/pokemon");
        return dispatch({ type: GET_POKEMOS, payload: result.data.pokemons });
    };
}

export function getPokemonDetalle(id){
  return async function (dispatch) {
    const result = await axios.get(`http://localhost:3001/pokemon/${id}`);
        return dispatch({ type: GET_POKEMOS_DETALLE, payload: result.data.pokemon });
  }
}

export function orderPokemon(Pokemon, order){
  return function(dispatch){

    Pokemon.sort(compare_lname);

    if(order === 'ASC'){
      return dispatch({ type: ORDER_POKEMON, payload: Pokemon });
    }else{
      return dispatch({ type: ORDER_POKEMON, payload: Pokemon.reverse() });
    }
  }
}

export function getTypes(){
  return async function (dispatch) {
      const result = await axios.get("http://localhost:3001/types");
      return dispatch({ type: GET_TYPES, payload: result.data.types });
  };

}

export function getPokemonByName(pokemons,name){
  return function (dispatch){
    return dispatch({ type: GET_POKEMON_BY_NAME, payload: pokemons.filter( p => p.name===name ) });
  }
}


function compare_lname( a, b )
  {
  if ( a.name.toLowerCase() < b.name.toLowerCase()){
    return -1;
  }
  if ( a.name.toLowerCase() > b.name.toLowerCase()){
    return 1;
  }
  return 0;
}