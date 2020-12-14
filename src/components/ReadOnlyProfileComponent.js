import React from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {fetchCitiesForUser} from "../actions/locations/cityActions";
import {connect} from "react-redux";
import {
    fetchTripsAttendingForUser,
    fetchTripsForUser
} from "../actions/tripActions";

export class ReadOnlyProfile extends React.Component {

    componentDidMount() {
        if (this.props.match.params.uid) {
            this.props.fetchCitiesForUser(this.props.match.params.uid);
            this.props.fetchTripsForUser(this.props.match.params.uid);
            this.props.fetchTripsAttendingForUser(this.props.match.params.uid);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.uid !== this.props.match.params.uid) {
            if (this.props.match.params.uid) {
                this.props.fetchCitiesForUser(this.props.match.params.uid);
                this.props.fetchTripsForUser(this.props.match.params.uid);
                this.props.fetchTripsAttendingForUser(this.props.match.params.uid);
            }
        }
    }

    render() {
        return (
            <div>
                <div className="container">
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
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.props.userTrips.map(trip => {
                                                                      const date = new Date(trip.date);
                                                                      return (
                                                                          <tr key={trip._id}>
                                                                              <td>
                                                                                  {trip.name}
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
                                <div className="row">
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
                                                                                           {trip.name}
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
                                                                           {city.name}
                                                                       </td>
                                                                       <td>{city.country}</td>
                                                                       <td>{city.state}</td>
                                                                       <td>
                                                                           {city.date_visited &&
                                                                            <FontAwesomeIcon
                                                                                icon={faCheck}/>}

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
    userDetails: state.userReducer.userDetails,
    userCities: state.cityReducer.userCities,
    userTrips: state.tripReducer.userTrips,
    userTripsAttending: state.tripReducer.userTripsAttending
});

const propertyToDispatchMapper = (dispatch) => ({
    fetchCitiesForUser: (uid) => fetchCitiesForUser(dispatch, uid),
    fetchTripsForUser: (uid) => fetchTripsForUser(dispatch, uid),
    fetchTripsAttendingForUser: (uid) => fetchTripsAttendingForUser(dispatch, uid)

});

export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(ReadOnlyProfile)
