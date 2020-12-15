import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/homepageStyles.css'
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {fetchActiveUser, logoutUser} from "../actions/userActions";
import {clearCitiesForUser, fetchCitiesForUser} from "../actions/locations/cityActions";
import {
    clearTripsForUser,
    fetchTripsAttendingForUser,
    fetchTripsForUser
} from "../actions/tripActions";
import {clearPlacesForUser, fetchPlacesForUser} from "../actions/locations/placeActions";
import {clearCityResults, updateSearchCity} from "../actions/search/citySearchActions";
import {clearPlaceResults, updateSearchPlace} from "../actions/search/placeSearchActions";
import {connect} from "react-redux";
import userCityService from "../services/userCityService";
import userPlaceService from "../services/userPlaceService";
import userTripService from "../services/userTripService";
import ListGroup from "react-bootstrap/ListGroup";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTrash} from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table";

class Homepage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            topPlaces: [],
            topCities: [],
            recentTrips: []
        }
    }

    componentDidMount() {
        this.props.fetchActiveUser()
        userCityService.fetchTopCities()
            .then(cities => {
                this.setState(prevState => {
                    return (
                        {
                            ...prevState,
                            topCities: cities
                        }
                    )})
            });

        userPlaceService.fetchTopPlaces()
            .then(places => {
                this.setState(prevState => {
                    return (
                        {
                            ...prevState,
                            topPlaces: places
                        }
                    )})
            });

        userTripService.fetchRecentTrips()
            .then(trips => {
                this.setState(prevState => {
                    return (
                        {
                            ...prevState,
                            recentTrips: trips
                        }
                    )})
            })
        if (this.props.userDetails._id) {
            this.props.fetchCitiesForUser(this.props.userDetails._id);
            this.props.fetchTripsForUser(this.props.userDetails._id);
            this.props.fetchTripsAttendingForUser(this.props.userDetails._id);
            this.props.fetchPlacesForUser(this.props.userDetails._id);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userDetails._id !== this.props.userDetails._id) {
            if (this.props.userDetails._id) {
                this.props.fetchCitiesForUser(this.props.userDetails._id);
                this.props.fetchTripsForUser(this.props.userDetails._id);
                this.props.fetchTripsAttendingForUser(this.props.userDetails._id);
                this.props.fetchPlacesForUser(this.props.userDetails._id);
            }
        }
    }

    login = () => {
        this.props.history.push("/login")
    };

    signUp = () => {
        this.props.history.push("/signup")
    };

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Traveler</h1>
                    {this.props.userDetails._id &&
                     <div>
                         <p>
                             Welcome back to Traveler!
                         </p>
                     </div>
                    }
                    {!this.props.userDetails._id &&
                     <div>
                         <p>
                             Welcome to Traveler, a site to plan your next big adventure!
                         </p>
                         <p>
                             Sign Up, Login, or have a look around
                         </p>
                         <div className="container-fluid">
                             <div className="row">
                                 <Button onClick={this.login} variant="primary m-2">Login</Button>
                                 <Button onClick={this.signUp} variant="primary m-2">Sign
                                     Up</Button>
                             </div>
                         </div>
                     </div>
                    }
                </Jumbotron>
                {this.props.userDetails._id &&
                 <div className="container">
                     <h3>User Stats</h3>
                     <div className="row">
                         <Table striped bordered hover>
                             <thead>
                             <tr>
                                 <th>Cities</th>
                                 <th>Places</th>
                                 <th>Trips Planned</th>
                                 <th>Trips Planned</th>
                             </tr>
                             </thead>
                             <tbody>
                             <tr key={this.props.userDetails._id}>
                                 <td>
                                     {this.props.userCities.length}
                                 </td>
                                 <td>
                                     {this.props.userPlaces.length}
                                 </td>
                                 <td>
                                     {this.props.userTrips.length}
                                 </td>
                                 <td>
                                     {this.props.userTripsAttending.length}
                                 </td>
                             </tr>
                             </tbody>
                         </Table>
                     </div>
                 </div>
                }
                <div className="container">
                    <h3>Site Stats</h3>
                    <div className="row">
                        <div className="col-md-4 mb-2">
                            <Card>
                                <Card.Header>Top Cities</Card.Header>
                                <Card.Body>
                                    <ListGroup as="ol">
                                        {this.state.topCities.map(city =>
                                                                      (
                                                                          <ListGroup.Item key={city._id + city.count} as="li">
                                                                              {city._id}
                                                                          </ListGroup.Item>
                                                                      ))}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-4 mb-2">
                            <Card>
                                <Card.Header>Top Places</Card.Header>
                                <Card.Body>
                                    <ListGroup as="ol">
                                        {this.state.topPlaces.map(place =>
                                                                      (
                                                                          <ListGroup.Item key={place._id + place.count} as="li">
                                                                              {place._id}
                                                                          </ListGroup.Item>
                                                                      ))}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-4 mb-2">
                            <Card>
                                <Card.Header>Recent Trips</Card.Header>
                                <Card.Body>
                                    <ListGroup as="ol">
                                        {this.state.recentTrips.map(trip =>
                                                                      (
                                                                          <ListGroup.Item key={trip._id} as="li">
                                                                              <Link to={`/trip/${trip._id}/itinerary`}>
                                                                                {trip.name}
                                                                              </Link>
                                                                          </ListGroup.Item>
                                                                      ))}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const stateToPropertyMapper = (state) => ({
    userDetails: state.userReducer.userDetails,
    userCities: state.cityReducer.userCities,
    userTrips: state.tripReducer.userTrips,
    userTripsAttending: state.tripReducer.userTripsAttending,
    userPlaces: state.placeReducer.userPlaces,
});

const propertyToDispatchMapper = (dispatch) => ({
    fetchActiveUser: () => fetchActiveUser(dispatch),
    logoutUser: () => logoutUser(dispatch),
    clearCitiesForUser: () => clearCitiesForUser(dispatch),
    clearTripsForUser: () => clearTripsForUser(dispatch),
    clearPlacesForUser: () => clearPlacesForUser(dispatch),
    clearCityResults: () => clearCityResults(dispatch),
    clearPlaceResults: () => clearPlaceResults(dispatch),
    updateSearchCity: (city) => updateSearchCity(dispatch, city),
    updateSearchPlace: (place) => updateSearchPlace(dispatch,place),
    fetchCitiesForUser: (uid) => fetchCitiesForUser(dispatch, uid),
    fetchTripsForUser: (uid) => fetchTripsForUser(dispatch, uid),
    fetchTripsAttendingForUser: (uid) => fetchTripsAttendingForUser(dispatch, uid),
    fetchPlacesForUser: (uid) => fetchPlacesForUser(dispatch, uid),
});


export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(Homepage)
