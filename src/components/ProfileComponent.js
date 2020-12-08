import React from "react";
import Navigation from "./NavigationComponent";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {addCity, fetchCitiesForUser} from "../actions/locations/cityActions";
import {connect} from "react-redux";
import {fetchTripsForUser} from "../actions/tripActions";

export class Profile extends React.Component {

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.props.fetchCitiesForUser(userId);
        this.props.fetchTripsForUser(userId);
    }

    render() {
        return (
            <div>
                <Navigation user={this.props.match.params.userId}/>
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
                                {this.props.userTrips.map(trip => {
                                                              const date = new Date(trip.date);
                                                              return (
                                                                  <tr key={trip._id}>
                                                                      <td>
                                                                          <Link
                                                                              to={`/${this.props.match.params.userId}/trip/${trip._id}`}>
                                                                              {trip.name}
                                                                          </Link>
                                                                      </td>
                                                                      <td>{date.getFullYear()}-{date.getMonth() + 1}-{date.getUTCDate()}</td>
                                                                  </tr>
                                                              )
                                                          }
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
                                                                   <tr key={city._id}>
                                                                       <td>
                                                                           <Link to={`/${this.props.match.params.userId}/city/${city._id}`}>
                                                                               {city.name}
                                                                           </Link>
                                                                       </td>
                                                                       <td>{city.country}</td>
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
    fetchCitiesForUser: (uid) => fetchCitiesForUser(dispatch, uid),
    fetchTripsForUser: (uid) => fetchTripsForUser(dispatch, uid),
    addCity: (city) => addCity(dispatch, city)
});


export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(Profile)
