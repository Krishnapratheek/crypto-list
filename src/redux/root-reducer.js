import { combineReducers } from "redux";
import coinsReducers from "./reducer";

const rootReducer = combineReducers({
    data:coinsReducers
});

export default rootReducer;

