import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import placeReducer from "./placeReducer";
import cityReducer from "./cityReducer";
import tripReducer from "./tripReducer";

const rootReducer = combineReducers(
    {
        searchReducer,
        placeReducer,
        cityReducer,
        tripReducer
    });

export default rootReducer
