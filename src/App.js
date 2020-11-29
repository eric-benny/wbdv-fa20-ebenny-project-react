import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Homepage from "./components/HomepageConmponent";
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootReducer from "./reducers";
import Login from "./components/admin/LoginComponent";
import SignUp from "./components/admin/SignupComponent";
import SearchComponent from "./components/search/SearchComponent";
import Profile from "./components/ProfileComponent";
import Trip from "./components/TripComponent";
import Place from "./components/locations/PlaceComponent";
import City from "./components/locations/CityComponent";


const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Route path="/"
                           exact
                           component={Homepage}/>
                    <Route path="/login"
                           exact
                           component={Login}/>
                    <Route path="/signup"
                           exact
                           component={SignUp}/>
                    <Route path="/search"
                           exact
                           component={SearchComponent}/>
                    <Route path="/:userID/profile"
                           exact
                           component={Profile}/>
                    <Route path="/:userID/trip/:tripId"
                           exact
                           component={Trip}/>
                    <Route path="/:userID/trip/:tripId/:tab"
                           exact
                           component={Trip}/>
                    <Route path="/:userId/city/:cityId"
                           exact
                           component={City}/>
                    <Route path="/:userID/city/:cityId/place/:placeId"
                           exact
                           component={Place}/>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
