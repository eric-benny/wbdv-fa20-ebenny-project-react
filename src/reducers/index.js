import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import placeReducer from "./placeReducer";
import cityReducer from "./cityReducer";
import tripReducer from "./tripReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers(
    {
        searchReducer,
        placeReducer,
        cityReducer,
        tripReducer,
        userReducer
    });

export default rootReducer
