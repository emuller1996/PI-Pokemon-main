import { GET_POKEMOS,ORDER_POKEMON } from "../actions/index";

const initialState = {
  pokemosAll: [],
  pokemonDetalle : {}
};

function rootReducer(state = initialState, action) {
    
    if (action.type === GET_POKEMOS) {
      return {
        ...state,
        pokemosAll: action.payload,
      };
    }

    if(action.type === ORDER_POKEMON){
      return {
        ...state,
        pokemosAll: action.payload,
      };
    }
    return state;
  }
  
  export default rootReducer;