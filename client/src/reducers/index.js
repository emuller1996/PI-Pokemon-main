import { GET_POKEMOS,ORDER_POKEMON,GET_TYPES } from "../actions/index";

const initialState = {
  pokemosAll: [],
  pokemonDetalle : {},
  types : []
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

    if(action.type === GET_TYPES){
      return {
        ...state,
        types: action.payload,
      }
    }
    return state;
  }
  
  export default rootReducer;