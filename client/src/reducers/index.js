import { GET_POKEMOS } from "../actions/index";

const initialState = {
  pokemosAll: []
};

function rootReducer(state = initialState, action) {
    
    if (action.type === GET_POKEMOS) {
      return {
        ...state,
        pokemosAll: action.payload,
      };
    }
    return state;
  }
  
  export default rootReducer;