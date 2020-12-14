import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap";
import userService from "../services/userService";
import {addCity, clearCitiesForUser, fetchCitiesForUser} from "../actions/locations/cityActions";
import {clearTripsForUser, fetchTripsForUser} from "../actions/tripActions";
import {connect} from "react-redux";
import {Profile} from "./ProfileComponent";
import {fetchActiveUser, logoutUser} from "../actions/userActions";
import {clearPlacesForUser} from "../actions/locations/placeActions";
import {clearCityResults, updateSearchCity} from "../actions/search/citySearchActions";
import {clearPlaceResults, updateSearchPlace} from "../actions/search/placeSearchActions";



class Navigation extends React.Component {

    componentDidMount() {
        this.props.fetchActiveUser()
    }


    logout = () => {
        this.props.logoutUser()
        this.props.clearCitiesForUser()
        this.props.clearTripsForUser()
        this.props.clearPlacesForUser()
        this.props.clearCityResults()
        this.props.clearPlaceResults()
        this.props.updateSearchCity('')
        this.props.updateSearchPlace('')
    }

    render() {
        return (
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="#">Traveler</Navbar.Brand>
                <Nav>
                    <LinkContainer to="/home">
                        <Nav.Link>
                            Home
                        </Nav.Link>
                    </LinkContainer>
                </Nav>
                <Nav>
                    <LinkContainer to="/profile">
                        <Nav.Link>
                            Profile
                        </Nav.Link>
                    </LinkContainer>
                </Nav>
                <Nav className="mr-auto">
                    <LinkContainer to="/search/citySearch">
                        <Nav.Link>
                            Search
                        </Nav.Link>
                    </LinkContainer>
                </Nav>
                {this.props.userDetails.username &&
                 <Nav className="ml-auto">
                     <Navbar.Brand>{this.props.userDetails.username}</Navbar.Brand>
                     <LinkContainer to="/home" onClick={this.logout}>
                         <Nav.Link>
                             Logout
                         </Nav.Link>
                     </LinkContainer>
                     {this.props.userDetails.admin &&
                      <LinkContainer to="/admin">
                          <Nav.Link>
                              Admin
                          </Nav.Link>
                      </LinkContainer>}
                 </Nav>
                }
                {!this.props.userDetails.username &&
                 <Nav className="ml-auto">
                     <LinkContainer to="/login">
                         <Nav.Link>
                             Login
                         </Nav.Link>
                     </LinkContainer>
                     <LinkContainer to="/signup">
                         <Nav.Link>
                             Sign Up
                         </Nav.Link>
                     </LinkContainer>
                 </Nav>
                }
            </Navbar>
        )
    }
}

const stateToPropertyMapper = (state) => ({
    userDetails: state.userReducer.userDetails
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
    updateSearchPlace: (place) => updateSearchPlace(dispatch,place)
});


export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(Navigation)


