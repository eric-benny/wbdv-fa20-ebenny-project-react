import Navigation from "./NavigationComponent";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faPlus} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Header from "./HeaderComponent";
import Nav from "react-bootstrap/Nav";
import Pagination from "react-bootstrap/Pagination";
import ListGroup from "react-bootstrap/ListGroup";
import {fetchCitiesForTrip} from "../actions/locations/cityActions";
import {fetchPlacesForCity} from "../actions/locations/placeActions";
import {connect} from "react-redux";
import {fetchTrip} from "../actions/tripActions";

class Trip extends React.Component {

    constructor() {
        super();
        let active = 2;
        let days = [];
        for (let number = 1; number <= 5; number++) {
            days.push(
                <Pagination.Item key={number} active={number === active}>
                    Day {number}
                </Pagination.Item>,
            );
        }
        days.push(
            <Pagination.Item key={-1}>
                <FontAwesomeIcon icon={faPlus}/>
            </Pagination.Item>,
        );
        this.state = {
            key: "itinerary",
            days: days
        }
    }

    componentDidMount() {
        const tripId = parseInt(this.props.match.params.tripId);
        this.props.fetchTrip(tripId);
        this.props.fetchCitiesForTrip(tripId);
    }

    handleSelect = (eventKey) => {
        this.setState(prevState => {
        return (
            {
                ...prevState,
                key: eventKey
            }
        )})
    }

    render() {
        return (
            <div>
                <Header title={this.props.trip.name}/>
                <div className="container">
                    <div className="row mt-2">
                        <Nav variant="tabs" defaultActiveKey="itinerary"
                             onSelect={this.handleSelect}>
                            <Nav.Item>
                                <Nav.Link to={`/user/trip/${this.props.trip.id}/itinerary`} eventKey="itinerary">
                                    Itinerary
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="cities">
                                    Cities
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="log">
                                    Travel Log
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    {this.state.key === "itinerary" &&
                     <div>
                         <h1>Itinerary</h1>
                         <Pagination>{this.state.days}</Pagination>
                         <ListGroup className="col-6">
                             <ListGroup.Item>Activity 1</ListGroup.Item>
                             <ListGroup.Item>Activity 2</ListGroup.Item>
                             <ListGroup.Item>Activity 3</ListGroup.Item>
                             <ListGroup.Item>Activity 4</ListGroup.Item>
                             <ListGroup.Item>Activity 5</ListGroup.Item>
                         </ListGroup>
                     </div>}
                    {this.state.key === "cities" &&
                     <div>
                         <h1>Cities</h1>
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
                             {this.props.cities.map(city =>
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
                     </div>}
                    {this.state.key === "log" &&
                     <div>
                         <h1>Travel Log</h1>
                         <div className="row">
                             <Nav variant="pills" defaultActiveKey="1"
                                  className="flex-column col-3">
                                 <Nav.Item>
                                     <Nav.Link eventKey="1">City Day 11/21/15</Nav.Link>
                                 </Nav.Item>
                                 <Nav.Item>
                                     <Nav.Link eventKey="2">Hike 11/22/15</Nav.Link>
                                 </Nav.Item>
                                 <Nav.Item>
                                     <Nav.Link eventKey="3">Museum 11/23/15</Nav.Link>
                                 </Nav.Item>
                                 <div className="container">
                                     <div className="row">
                                         <div className="col-12">
                                             <button className="mt-1 btn fa fa-plus fa-lg pull-right"/>
                                         </div>
                                     </div>
                                 </div>
                             </Nav>
                             <div className="col-9">
                                 <div className="row">
                                     <div className="container">
                                         <h1>Title for the Log</h1>
                                         <p>this is what happened</p>
                                         <p>maybe a picture could go here too</p>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>}
                </div>
            </div>
        )
    }
}

const stateToPropertyMapper = (state) => ({
    trip: state.tripReducer.selectedTrip,
    cities: state.cityReducer.citiesForTrip,
    cityPlaces: state.placeReducer.citiesForCity
});

const propertyToDispatchMapper = (dispatch) => ({
    fetchTrip: (tripId) => fetchTrip(dispatch, tripId),
    fetchPlacesForCity: (cityId) => fetchPlacesForCity(dispatch, cityId),
    fetchCitiesForTrip: (tripId) => fetchCitiesForTrip(dispatch, tripId)
});

export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(Trip)
