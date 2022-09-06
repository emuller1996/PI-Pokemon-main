import axios from 'axios';


export const GET_POKEMOS = "GET_POKEMOS";
export const ORDER_POKEMON = 'ORDER_POKEMON';


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