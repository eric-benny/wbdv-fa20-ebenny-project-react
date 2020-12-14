import React from 'react';
import './App.css';
import './css/tableStyles.css'
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
import Navigation from "./components/NavigationComponent";
import ReadOnlyProfile from "./components/ReadOnlyProfileComponent";


const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Navigation/>
                <div>
                    <Route path={["/home"]}
                           exact
                           component={Homepage}/>
                    <Route path="/login"
                           exact
                           component={Login}/>
                    <Route path="/signup"
                           exact
                           component={SignUp}/>
                    <Route path={["/search/:type", "/search/:type/:query"]}
                           exact
                           component={SearchComponent}/>
                    <Route path={["/profile"]}
                           exact
                           component={Profile}/>
                    <Route path={["/profile/:uid"]}
                           exact
                           component={ReadOnlyProfile}/>
                    <Route path={["/trip/:tripId","/trip/:tripId/:tab","/trip/:tripId/:tab/:cityId"]}
                           exact
                           component={Trip}/>
                    <Route path="/:component/city/:cityId"
                           exact
                           component={City}/>
                    <Route path="/:component/:tripId/city/:cityId"
                           exact
                           component={City}/>
                    <Route path="/:component/city/:cityId/place/:placeId"
                           exact
                           component={Place}/>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
