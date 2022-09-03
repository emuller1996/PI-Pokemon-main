export const GET_POKEMOS = "GET_POKEMOS";


export function getPokemos() {
    return function (dispatch) {
      return fetch("http://localhost:3001/pokemon")
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: GET_POKEMOS, payload: json.pokemons });
        });
    };

    
  }