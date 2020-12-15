import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import placeReducer from "./placeReducer";
import cityReducer from "./cityReducer";
import tripReducer from "./tripReducer";
import userReducer from "./userReducer";
import activityReducer from "./activityReducer";
import logReducer from "./logReducer";

const rootReducer = combineReducers(
    {
        searchReducer,
        placeReducer,
        cityReducer,
        tripReducer,
        userReducer,
        activityReducer,
        logReducer
    });

export default rootReducer
