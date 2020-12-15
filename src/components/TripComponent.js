import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Nav from "react-bootstrap/Nav";
import ListGroup from "react-bootstrap/ListGroup";
import {fetchCitiesForUser} from "../actions/locations/cityActions";
import {
    addTripToPlace,
    clearPlacesForCity,
    fetchPlacesForCity
} from "../actions/locations/placeActions";
import {connect} from "react-redux";
import {
    addAttendeeToTrip,
    addCityToTrip,
    fetchTrip,
    saveTrip,
    updateTrip
} from "../actions/tripActions";
import Navbar from "react-bootstrap/Navbar";
import {LinkContainer} from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import {FormControl, InputGroup} from "react-bootstrap";
import {fetchAllUsers} from "../actions/userActions";
import Itinerary from "./ItineraryComponent";
import Log from "./LogComponent";

class Trip extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            key: this.props.match.params.tab,
            selectedCityId: '',
            selectedPlaceId: '',
            selectedAttendeeId: '',
            selectedTripCity: '',
            editing: false
        }
    }

    componentDidMount() {
        const tripId = this.props.match.params.tripId;
        this.props.fetchTrip(tripId);
        this.props.fetchCitiesForUser(this.props.userDetails._id);
        this.props.fetchAllUsers()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userDetails._id !== this.props.userDetails._id) {
            if (this.props.userDetails._id) {
                this.props.fetchCitiesForUser(this.props.userDetails._id);
            }
        }
        if (prevProps.match.params.tab !== this.props.match.params.tab) {
            if (this.props.match.params.tab) {
                this.setState(prevState => {
                    return (
                        {
                            ...prevState,
                            key: this.props.match.params.tab
                        }
                    )})
            }
        }
    }

    handleSelect = (eventKey) => {
        this.setState(prevState => {
        return (
            {
                ...prevState,
                key: eventKey
            }
        )})
        this.props.history.push(`/trip/${this.props.trip._id}/${eventKey}`)
    }

    componentWillUnmount() {
        this.props.clearPlacesForCity()
    }

    handleCitySelect = (eventKey) => {
        this.props.fetchPlacesForCity(eventKey)
        this.setState(prevState => {
            return (
                {
                    ...prevState,
                    selectedTripCity: eventKey
                }
            )})
    }

    handleSelectedCityChange = (event) => {
        this.setState(prevState => {
            return (
                {
                    ...prevState,
                    selectedCityId: event.target.value
                }
            )})
    }

    handleSelectedPlaceChange = (event) => {
        this.setState(prevState => {
            return (
                {
                    ...prevState,
                    selectedPlaceId: event.target.value
                }
            )})
    }

    handleSelectedAttendeeChange = (event) => {
        this.setState(prevState => {
            return (
                {
                    ...prevState,
                    selectedAttendeeId: event.target.value
                }
            )})
    }

    updateTripDate = (trip, event) => {
        this.props.updateTrip({...trip, date: event.target.value})
    }

    updateTripName = (trip, event) => {
        this.props.updateTrip({...trip, name: event.target.value})
    }


    edit = () => {
        this.setState(prevState => {
            return (
                {
                    ...prevState,
                    editing: !prevState.editing
                }
            )})
    }

    saveEdit = (tid, trip) => {
        this.edit()
        this.props.saveTrip(tid, trip)
    }

    convertISODate = (isoDate) => {
        if (isoDate === null) {
            return isoDate
        } else {
            const date = new Date(isoDate);
            const year = date.getFullYear();
            let month = date.getMonth()+1;
            let dt = date.getDate()+1;

            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }
            return year + '-' + month + '-' + dt;
        }
    }

    render() {
        return (
            <div>
                <Navbar bg="light" variant="light">
                    <Nav className="mr-auto">
                        <LinkContainer to={`/profile`}>
                            <Nav.Link>
                                <FontAwesomeIcon icon={faTimes}/>
                            </Nav.Link>
                        </LinkContainer>
                        <Navbar.Brand>{this.props.trip.name}</Navbar.Brand>
                    </Nav>
                    {this.props.userDetails._id === this.props.trip.userId &&
                     <div>
                        {
                            this.state.editing ?
                                 <Button variant="outline-info"
                                         onClick={() => this.saveEdit(this.props.trip._id,
                                                                      this.props.trip)}>
                                     Save
                                 </Button> :
                                 <Button variant="outline-info" onClick={this.edit}>
                                     Edit
                                 </Button>
                        }
                     </div>
                    }
                </Navbar>
                <div className="container">
                    <div className="row mt-2">
                        <h3>Trip Details</h3>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            {this.state.editing ?
                             <FormControl type="text"
                                          value={this.props.trip.name}
                                          onChange={(e) => this.updateTripName(this.props.trip, e)}/> :
                             <FormControl type="text"
                                          readOnly
                                          value={this.props.trip.name}/>
                            }
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Owner</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl readOnly value={this.props.trip.userId}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Start Date</InputGroup.Text>
                            </InputGroup.Prepend>
                            {this.state.editing ?
                             <FormControl type="date"
                                          onChange={(e) => this.updateTripDate(this.props.trip, e)}
                                          value={this.convertISODate(this.props.trip.date) === null ?
                                                 undefined:
                                                 this.convertISODate(this.props.trip.date)}/>:
                             <FormControl type="date"
                                          readOnly
                                          value={this.convertISODate(this.props.trip.date) === null ?
                                                 undefined:
                                                 this.convertISODate(this.props.trip.date)}/>}
                        </InputGroup>
                    </div>
                    <div className="row mt-2">
                        <Nav variant="tabs" activeKey={this.props.match.params.tab}
                             onSelect={this.handleSelect}>
                            <Nav.Item>
                                <Nav.Link to={`/trip/${this.props.trip._id}/itinerary`} eventKey="itinerary">
                                    Itinerary
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link to={`/trip/${this.props.trip._id}/tripCities`} eventKey="tripCities">
                                    Cities
                                </Nav.Link>
                            </Nav.Item>
                            {(this.props.userDetails._id === this.props.trip.userId ||
                              (this.props.trip.attendees && this.props.trip.attendees.find(
                                  attendee => this.props.userDetails._id === attendee._id))) &&
                             <Nav.Item>
                                 <Nav.Link to={`/trip/${this.props.trip._id}/log`} eventKey="log">
                                     Travel Log
                                 </Nav.Link>
                             </Nav.Item>
                            }
                            <Nav.Item>
                                <Nav.Link to={`/trip/${this.props.trip._id}/attendees`} eventKey="attendees">
                                    Attendees
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    {this.state.key === "itinerary" &&
                     <Itinerary/>}
                    {this.state.key === "tripCities" &&
                     <div>
                         {this.props.userDetails._id === this.props.trip.userId &&
                          <form className="form-inline my-2">
                              <div className="form-group mb-2">
                                  <select className="form-control m-1"
                                          placeholder="select a city"
                                          onChange={this.handleSelectedCityChange}
                                          value={this.state.selectedCityId}>
                                      <option key="1" value="" disabled>Select a city...</option>
                                      {this.props.userCities.map(city => {
                                          if (!this.props.trip.cities.find(tripCity => {
                                              return tripCity._id === city._id
                                          })) {
                                              return <option key={city._id}
                                                             value={city._id}>{city.name}</option>
                                          }
                                      })}
                                  </select>
                                  <Button className="form-control m-1"
                                          variant="primary"
                                          onClick={() => this.props.addCityToTrip(
                                              this.props.trip._id, this.state.selectedCityId)}>
                                      Add City
                                  </Button>
                              </div>
                          </form>
                         }
                         <div className="row">
                             <Nav variant="pills"
                                  className="flex-column col-3 mt-2"
                                  onSelect={this.handleCitySelect}
                                  defaultActiveKey={this.state.selectedTripCity}>
                                 {this.props.trip.cities && this.props.trip.cities.map(city =>
                                                                                           (
                                                                                               <Nav.Item>
                                                                                                   <Nav.Link eventKey={city._id}>
                                                                                                       {city.name}
                                                                                                   </Nav.Link>
                                                                                               </Nav.Item>
                                                                                           )
                                 )}
                             </Nav>
                             {this.state.selectedTripCity !== '' &&
                              <div className="col-9">
                                  {this.props.userDetails._id === this.props.trip.userId &&
                                   <form className="form-inline my-2">
                                       <div className="form-group mb-2">
                                           <select className="form-control m-1"
                                                   placeholder="select a place"
                                                   onChange={this.handleSelectedPlaceChange}
                                                   value={this.state.selectedPlaceId}>
                                               <option key="1" value="" disabled>Select a place...
                                               </option>
                                               {this.props.cityPlaces.map(place => {
                                                   if (!place.trips.includes(this.props.trip._id)) {
                                                       return <option key={place._id}
                                                                      value={place._id}>{place.name}</option>
                                                   }
                                               })}
                                           </select>
                                           <Button className="form-control m-1"
                                                   variant="primary"
                                                   onClick={() => this.props.addTripToPlace(
                                                       this.state.selectedPlaceId,
                                                       this.props.trip._id)}>
                                               Add Place
                                           </Button>
                                       </div>
                                   </form>
                                  }
                                  <h5 className="mt-2">Places</h5>
                                  <ListGroup className="col-6 mt-2">
                                      {this.props.cityPlaces && this.props.cityPlaces.map(place => {
                                                                                              if (place.trips.includes(this.props.trip._id)) {
                                                                                                  return (
                                                                                                      <ListGroup.Item>{place.name}</ListGroup.Item>
                                                                                                  )
                                                                                              }
                                                                                          }
                                      )}
                                  </ListGroup>
                              </div>
                             }
                         </div>
                     </div>}
                    {this.state.key === "log" &&
                     (this.props.userDetails._id === this.props.trip.userId ||
                      (this.props.trip.attendees && this.props.trip.attendees.find(attendee => this.props.userDetails._id === attendee._id))) &&
                     <Log/>}
                    {this.state.key === "attendees" &&
                     <div>
                         {this.props.userDetails._id === this.props.trip.userId &&
                          <form className="form-inline my-2">
                              <div className="form-group mb-2">
                                  <select className="form-control m-1"
                                          placeholder="select a city"
                                          onChange={this.handleSelectedAttendeeChange}
                                          value={this.state.selectedAttendeeId}>
                                      <option key="1" value="" disabled>Select a user...</option>
                                      {this.props.users.map(user => {
                                          if (!this.props.trip.attendees.find(attendee => {
                                              return attendee._id === user._id || this.props.userDetails._id === user._id
                                          })) {
                                              return <option key={user._id}
                                                             value={user._id}>{user.username}</option>
                                          }
                                      })}
                                  </select>
                                  <Button className="form-control m-1"
                                          variant="primary"
                                          onClick={() => this.props.addAttendeeToTrip(
                                              this.props.trip._id, this.state.selectedAttendeeId)}>
                                      Add Attendee
                                  </Button>
                              </div>
                          </form>
                         }
                         <div className="row">
                             <Table striped bordered hover className="mt-2">
                                 <thead>
                                 <tr>
                                     <th>Username</th>
                                     <th>First</th>
                                     <th>Last</th>
                                 </tr>
                                 </thead>
                                 <tbody>
                                 {this.props.trip.attendees && this.props.trip.attendees.map(attendee =>
                                                                 (
                                                                     <tr>
                                                                         <td>
                                                                             <Link to={`/profile/${attendee._id}`}>
                                                                                 {attendee.username}
                                                                             </Link>
                                                                         </td>
                                                                         <td>{attendee.firstName}</td>
                                                                         <td>{attendee.lastName}</td>
                                                                     </tr>
                                                                 )
                                 )}
                                 </tbody>
                             </Table>
                         </div>
                     </div>}
                </div>
            </div>
        )
    }
}

const stateToPropertyMapper = (state) => ({
    trip: state.tripReducer.selectedTrip,
    cityPlaces: state.placeReducer.placesForCity,
    userCities: state.cityReducer.userCities,
    userDetails: state.userReducer.userDetails,
    users: state.userReducer.allUsers
});

const propertyToDispatchMapper = (dispatch) => ({
    fetchTrip: (tripId) => fetchTrip(dispatch, tripId),
    fetchPlacesForCity: (cityId) => fetchPlacesForCity(dispatch, cityId),
    fetchCitiesForUser: (uid) => fetchCitiesForUser(dispatch, uid),
    addCityToTrip: (tid, cid) => addCityToTrip(dispatch, tid, cid),
    addAttendeeToTrip: (tid, uid) => addAttendeeToTrip(dispatch, tid, uid),
    clearPlacesForCity: () => clearPlacesForCity(dispatch),
    addTripToPlace: (pid, tid) => addTripToPlace(dispatch, pid, tid),
    updateTrip: (trip) => updateTrip(dispatch, trip),
    saveTrip: (tid, trip) => saveTrip(dispatch, tid, trip),
    fetchAllUsers: () => fetchAllUsers(dispatch)
});

export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(Trip)
