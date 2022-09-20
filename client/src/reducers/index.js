import { 
  GET_POKEMOS,
  ORDER_POKEMON_BY_NAME,
  GET_TYPES, 
  GET_POKEMOS_DETALLE, 
  GET_POKEMON_BY_NAME,
  CHANGE_ORDER,
  ORDER_POKEMON_BY_ATTACK,
  FILTER_POKEMON
} from "../actions/index";

const initialState = {
  pokemosAll: [],
  pokemonDetalle : {},
  types : [],
  order : '',
  orderBy : 'Name'
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

    if(action.type === ORDER_POKEMON_BY_NAME){
      return {
        ...state,
        pokemosAll: action.payload,
      };
    }
    if(action.type === ORDER_POKEMON_BY_ATTACK){
      return {
        ...state,
        pokemosAll: action.payload,
      };
    }

    if(action.type ===FILTER_POKEMON){
      return {
        ...state,
        pokemosAll: action.payload,
      };
    }

    if(action.type ===CHANGE_ORDER){
      return {
        ...state,
        order: action.payload,
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