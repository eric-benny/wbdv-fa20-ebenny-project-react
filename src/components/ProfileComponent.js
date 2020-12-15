import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck, faTrash} from "@fortawesome/free-solid-svg-icons";
import {addCity, deleteCity, fetchCitiesForUser} from "../actions/locations/cityActions";
import {connect} from "react-redux";
import {
    createTrip,
    deleteTrip,
    fetchTripsAttendingForUser,
    fetchTripsForUser
} from "../actions/tripActions";
import {FormControl, InputGroup} from "react-bootstrap";
import {fetchActiveUser, saveUser, updateUser} from "../actions/userActions";

export class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editing: false
        }
    }

    componentDidMount() {
        this.props.fetchActiveUser()
        if (this.props.userDetails._id) {
            this.props.fetchCitiesForUser(this.props.userDetails._id);
            this.props.fetchTripsForUser(this.props.userDetails._id);
            this.props.fetchTripsAttendingForUser(this.props.userDetails._id);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userDetails._id !== this.props.userDetails._id) {
            if (this.props.userDetails._id) {
                this.props.fetchCitiesForUser(this.props.userDetails._id);
                this.props.fetchTripsForUser(this.props.userDetails._id);
                this.props.fetchTripsAttendingForUser(this.props.userDetails._id);
            }
        }
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

    save = () => {
        this.props.saveUser(this.props.userDetails._id, this.props.userDetails)
        this.setState(prevState => {
            return (
                {
                    ...prevState,
                    editing: !prevState.editing
                }
            )})
    }

    updateUserFirstName = (user, event) => {
        this.props.updateUser({...user, firstName: event.target.value})
    }

    updateUserLastName = (user, event) => {
        this.props.updateUser({...user, lastName: event.target.value})
    }

    updateUserEmail = (user, event) => {
        this.props.updateUser({...user, email: event.target.value})
    }

    login = () => {
        this.props.history.push("/login")
    }

    render() {
        return (
            <div>
                {this.props.userDetails && !this.props.userDetails._id &&
                <div className="container">
                    <div className="row justify-content-md-center my-2">
                        <Button variant="primary"
                                onClick={this.login}>Login</Button>
                    </div>
                </div> }
                {this.props.userDetails._id &&
                 <div className="container">
                     <div className="row mt-2">
                         <div className="container-fluid">
                             <div className='row'>
                                 <h3 className="mr-auto">Profile Details</h3>
                                 <div>
                                     {this.state.editing ?
                                      <Button variant="outline-info"
                                              onClick={this.save}>Done</Button> :
                                      <Button variant="outline-info"
                                              onClick={this.edit}>Edit</Button>}
                                 </div>
                             </div>
                         </div>
                         <InputGroup className="mb-3">
                             <InputGroup.Prepend>
                                 <InputGroup.Text>First Name</InputGroup.Text>
                             </InputGroup.Prepend>
                             {this.state.editing ?
                              <FormControl type="text"
                                           value={this.props.userDetails.firstName}
                                           onChange={(e) => this.updateUserFirstName(
                                               this.props.userDetails, e)}/> :
                              <FormControl type="text"
                                           readOnly
                                           value={this.props.userDetails.firstName}/>
                             }
                         </InputGroup>
                         <InputGroup className="mb-3">
                             <InputGroup.Prepend>
                                 <InputGroup.Text>Last Name</InputGroup.Text>
                             </InputGroup.Prepend>
                             {this.state.editing ?
                              <FormControl type="text"
                                           value={this.props.userDetails.lastName}
                                           onChange={(e) => this.updateUserLastName(
                                               this.props.userDetails, e)}/> :
                              <FormControl type="text"
                                           readOnly
                                           value={this.props.userDetails.lastName}/>
                             }
                         </InputGroup>
                         <InputGroup className="mb-3">
                             <InputGroup.Prepend>
                                 <InputGroup.Text>Email</InputGroup.Text>
                             </InputGroup.Prepend>
                             {this.state.editing ?
                              <FormControl type="email"
                                           value={this.props.userDetails.email}
                                           onChange={(e) => this.updateUserEmail(
                                               this.props.userDetails, e)}/> :
                              <FormControl type="email"
                                           readOnly
                                           value={this.props.userDetails.email}/>
                             }
                         </InputGroup>
                     </div>
                     <div className="row">
                         <div className="col-sm-6">
                             <div className="container-fluid">
                                 <div className="row">
                                     <h2>Trips (Owner)</h2>
                                     <Table striped bordered hover>
                                         <thead>
                                         <tr>
                                             <th>Name</th>
                                             <th>Start Date</th>
                                             {this.state.editing &&
                                              <th>Delete</th>}
                                         </tr>
                                         </thead>
                                         <tbody>
                                         {this.props.userTrips.map(trip => {
                                                                       const date = new Date(trip.date);
                                                                       return (
                                                                           <tr key={trip._id}>
                                                                               <td>
                                                                                   <Link
                                                                                       to={`/trip/${trip._id}/itinerary`}>
                                                                                       {trip.name}
                                                                                   </Link>
                                                                               </td>
                                                                               <td>{date.getFullYear()}-{date.getMonth()
                                                                                                         + 1}-{date.getUTCDate()}</td>
                                                                               {this.state.editing &&
                                                                                <td>
                                                                                    <Button className="table_delete"
                                                                                            variant="danger"
                                                                                            onClick={() => this.props.deleteTrip(
                                                                                                trip._id)}>
                                                                                        <FontAwesomeIcon icon={faTrash}/>
                                                                                    </Button>
                                                                                </td>}
                                                                           </tr>
                                                                       )
                                                                   }
                                         )}
                                         </tbody>
                                     </Table>
                                     <Button variant="primary" onClick={() => this.props.createTrip(
                                         this.props.userDetails._id)}>
                                         Add Trip
                                     </Button>
                                 </div>
                                 <div className="row mt-2">
                                     <h2>Trips (Attending)</h2>
                                     <Table striped bordered hover>
                                         <thead>
                                         <tr>
                                             <th>Name</th>
                                             <th>Start Date</th>
                                         </tr>
                                         </thead>
                                         <tbody>
                                         {this.props.userTripsAttending.map(trip => {
                                                                                const date = new Date(trip.date);
                                                                                return (
                                                                                    <tr key={trip._id}>
                                                                                        <td>
                                                                                            <Link
                                                                                                to={`/trip/${trip._id}/itinerary`}>
                                                                                                {trip.name}
                                                                                            </Link>
                                                                                        </td>
                                                                                        <td>{date.getFullYear()}-{date.getMonth()
                                                                                                                  + 1}-{date.getUTCDate()}</td>
                                                                                    </tr>
                                                                                )
                                                                            }
                                         )}
                                         </tbody>
                                     </Table>
                                 </div>
                             </div>
                         </div>
                         <div className="col-sm-6">
                             <div className="container-fluid">
                                 <div className="row">
                                     <h2>Cities</h2>
                                     <Table striped bordered hover>
                                         <thead>
                                         <tr>
                                             <th>Name</th>
                                             <th>Country</th>
                                             <th>State/Province</th>
                                             <th>Visited</th>
                                             {this.state.editing &&
                                              <th>Delete</th>}
                                         </tr>
                                         </thead>
                                         <tbody>
                                         {this.props.userCities.map(city =>
                                                                        (
                                                                            <tr key={city._id}>
                                                                                <td>
                                                                                    <Link
                                                                                        to={`/profile/city/${city._id}`}>
                                                                                        {city.name}
                                                                                    </Link>
                                                                                </td>
                                                                                <td>{city.country}</td>
                                                                                <td>{city.state}</td>
                                                                                <td>
                                                                                    {city.lastVisited &&
                                                                                     <FontAwesomeIcon
                                                                                         icon={faCheck}/>}
                                                                                </td>
                                                                                {this.state.editing &&
                                                                                 <td>
                                                                                     <Button
                                                                                         className="table_delete"
                                                                                         variant="danger"
                                                                                         onClick={() => this.props.deleteCity(
                                                                                             city._id)}>
                                                                                         <FontAwesomeIcon
                                                                                             icon={faTrash}/>
                                                                                     </Button>
                                                                                 </td>}
                                                                            </tr>
                                                                        )
                                         )}
                                         </tbody>
                                     </Table>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
                }
            </div>
        )
    }

}

const stateToPropertyMapper = (state) => ({
    userDetails: state.userReducer.userDetails,
    userCities: state.cityReducer.userCities,
    userTrips: state.tripReducer.userTrips,
    userTripsAttending: state.tripReducer.userTripsAttending
});

const propertyToDispatchMapper = (dispatch) => ({
    fetchCitiesForUser: (uid) => fetchCitiesForUser(dispatch, uid),
    fetchTripsForUser: (uid) => fetchTripsForUser(dispatch, uid),
    fetchTripsAttendingForUser: (uid) => fetchTripsAttendingForUser(dispatch, uid),
    addCity: (city) => addCity(dispatch, city),
    deleteCity: (cid) => deleteCity(dispatch, cid),
    deleteTrip: (tid) => deleteTrip(dispatch, tid),
    createTrip: (uid) => createTrip(dispatch, uid),
    updateUser: (user) => updateUser(dispatch, user),
    saveUser: (uid, user) => saveUser(dispatch, uid, user),
    fetchActiveUser: () => fetchActiveUser(dispatch)
});


export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(Profile)
