import * as types from "./actionType";

const initialState ={
    coins: [],
    coin: {},
    loading: true,
}

const coinsReducers = (state = initialState, action) => {
switch (action.type){
    case types.GET_COINS:
        return{
            ...state,
            coins: action.payload,
            loading: false,
        };
        
    case types.DELETE_COIN:
    case types.ADD_COIN:
         return{
            ...state,
            
            loading: false,
        };

    default:
        return state;
  }
};

export default coinsReducers;
