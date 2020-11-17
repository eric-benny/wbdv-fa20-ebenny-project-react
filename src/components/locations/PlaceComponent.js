import {InputGroup, FormControl} from 'react-bootstrap'
import React from "react";
import Header from "../HeaderComponent";
import {connect} from "react-redux";
import {fetchPlace} from "../../actions/locations/placeActions";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

export class Place extends React.Component {

    componentDidMount() {
        const placeId = parseInt(this.props.match.params.placeId);
        this.props.fetchPlace(placeId)
    }

    render() {
        return (
            <div>
                <Navbar bg="light" variant="light">
                    <Nav className="mr-auto">
                        <LinkContainer to={`/user/city/${this.props.place.cityId}`}>
                            <Nav.Link>
                                <FontAwesomeIcon icon={faTimes}/>
                            </Nav.Link>
                        </LinkContainer>
                        <Navbar.Brand>{this.props.place.name}</Navbar.Brand>
                    </Nav>
                    <Button variant="outline-info">Edit</Button>
                </Navbar>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <h2>Information</h2>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Name</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl readOnly value={this.props.place.name}/>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Address</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl readOnly value={this.props.place.address}/>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Last Visited</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl readOnly value="10/15/2015"/>
                            </InputGroup>
                        </div>
                        <div className="col-6">
                            <h2>Notes</h2>
                            <p>This is a space to store notes about a place. Things like tip about where and when to go. Things you want to do there. Reminders for when you visit again.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const stateToPropertyMapper = (state) => ({
    place: state.placeReducer.selectedPlace
});

const propertyToDispatchMapper = (dispatch) => ({
    fetchPlace: (placeId) => fetchPlace(dispatch, placeId)
});

export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(Place)
