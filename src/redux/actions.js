import * as types from "./actionType";
import axios from "axios";

const getCoins = (coins) => ({
    type: types.GET_COINS,
    payload: coins,
});

const coinDeleted = () => ({
    type: types.DELETE_COIN,
});

const coinAdded = () => ({
    type: types.ADD_COIN,
});

export const loadCoins = () => {
    
  return function (dispatch){
    
     axios.get(`${process.env.REACT_APP_API}`).then((resp) => {
        console.log("success");

        dispatch(getCoins(resp.data));
     })
      .catch(error => console.log(error));
 };
};

export const deleteCoin = (id) => {
    return function (dispatch){
        axios.delete(`${process.env.REACT_APP_API}/${id}`)
        .then((resp) => {
            console.log("resp",resp)
            dispatch(coinDeleted());
            dispatch(loadCoins());
        })
        .catch(error => console.log(error));
    };
   };

   export const addCoin = (coin) => {
    return function (dispatch){
        axios.post(`${process.env.REACT_APP_API}`, coin)
        .then((resp) => {
            console.log("resp",resp)
             
            dispatch(coinAdded());
            dispatch(loadCoins());
           
        })
        .catch(error => console.log(error));
    };
   };