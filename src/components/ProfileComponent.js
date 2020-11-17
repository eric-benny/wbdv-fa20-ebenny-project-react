import React from "react";
import Navigation from "./NavigationComponent";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {
    executeCitySearch,
    updateAutofillCities,
    updateSearchCity
} from "../actions/search/citySearchActions";
import {addCity} from "../actions/locations/cityActions";
import {connect} from "react-redux";

export class Profile extends React.Component {

    render() {
        return (
            <div>
                <Navigation/>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <h2>Trips</h2>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Start Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.userTrips.map(trip =>
                                                               (
                                                                   <tr>
                                                                       <td>
                                                                           <Link to={`/user/trip/${trip.id}`}>
                                                                               {trip.name}
                                                                           </Link>
                                                                       </td>
                                                                       <td>{trip.date}</td>
                                                                   </tr>
                                                               )
                                )}
                                </tbody>
                            </Table>
                        </div>
                        <div className="col-6">
                            <h2>Cities</h2>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Country</th>
                                    <th>State/Province</th>
                                    <th>Visited</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.userCities.map(city =>
                                                               (
                                                                   <tr>
                                                                       <td>
                                                                           <Link to={`/user/city/${city.id}`}>
                                                                               {city.name}
                                                                           </Link>
                                                                       </td>
                                                                       <td>{city.countryName}</td>
                                                                       <td>{city.state}</td>
                                                                       <td>
                                                                           <FontAwesomeIcon
                                                                               icon={faCheck}/>
                                                                       </td>
                                                                   </tr>
                                                               )
                                )}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const stateToPropertyMapper = (state) => ({
    userCities: state.cityReducer.userCities,
    userTrips: state.tripReducer.userTrips
});

const propertyToDispatchMapper = (dispatch) => ({
    addCity: (city) => addCity(dispatch, city)
});


export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(Profile)
