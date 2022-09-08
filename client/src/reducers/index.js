import { GET_POKEMOS,ORDER_POKEMON,GET_TYPES, GET_POKEMOS_DETALLE, GET_POKEMON_BY_NAME } from "../actions/index";

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
    if(action.type === GET_POKEMOS_DETALLE){
      return {
        ...state,
        pokemonDetalle: action.payload,
      };
    }

    if(action.type === ORDER_POKEMON){
      return {
        ...state,
        pokemosAll: action.payload,
      };
    }

    if(action.type ===GET_POKEMON_BY_NAME){
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