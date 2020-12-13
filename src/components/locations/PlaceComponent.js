import {InputGroup, FormControl} from 'react-bootstrap'
import React from "react";
import Header from "../HeaderComponent";
import {connect} from "react-redux";
import {fetchPlace, savePlace, updatePlace} from "../../actions/locations/placeActions";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import {saveCity, updateCity} from "../../actions/locations/cityActions";

export class Place extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editing: false
        }
    }

    componentDidMount() {
        const placeId = this.props.match.params.placeId;
        this.props.fetchPlace(placeId)
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

    updatePlaceNotes = (place, event) => {
        this.props.updatePlace({...place, notes: event.target.value})
    }

    updatePlaceLastVisited = (place, event) => {
        this.props.updatePlace({...place, lastVisited: event.target.value})
    }

    saveEdit = (pid, place) => {
        this.edit()
        this.props.savePlace(pid, place)
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
                        <LinkContainer to={`/${this.props.match.params.component}/city/${this.props.place.cityId}`}>
                            <Nav.Link>
                                <FontAwesomeIcon icon={faTimes}/>
                            </Nav.Link>
                        </LinkContainer>
                        <Navbar.Brand>{this.props.place.name}</Navbar.Brand>
                    </Nav>
                    {this.state.editing ?
                     <Button variant="outline-info" onClick={() => this.saveEdit(this.props.place._id, this.props.place)}>
                         Save
                     </Button>:
                     <Button variant="outline-info" onClick={this.edit}>
                         Edit
                     </Button>}
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
                                <FormControl readOnly value={this.props.place.details}/>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Last Visited</InputGroup.Text>
                                </InputGroup.Prepend>
                                {this.state.editing ?
                                 <FormControl type="date"
                                              onChange={(e) => this.updatePlaceLastVisited(this.props.place, e)}
                                              value={this.convertISODate(this.props.place.lastVisited) === null ?
                                                     undefined:
                                                     this.convertISODate(this.props.place.lastVisited)}/>:
                                 <FormControl type="date"
                                              readOnly
                                              value={this.convertISODate(this.props.place.lastVisited) === null ?
                                                     undefined:
                                                     this.convertISODate(this.props.place.lastVisited)}/>}
                            </InputGroup>
                        </div>
                        <div className="col-6">
                            <h2>Notes</h2>
                            {this.state.editing ?
                             <textarea className="form-control"
                                       value={this.props.place.notes === null ?
                                              undefined:
                                              this.props.place.notes}
                                       placeholder="Notes..."
                                       onChange={(e) => this.updatePlaceNotes(this.props.place, e)}/>:
                             <p>{this.props.place.notes}</p>}
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
    fetchPlace: (placeId) => fetchPlace(dispatch, placeId),
    updatePlace: (place) => updatePlace(dispatch, place),
    savePlace: (pid, place) => savePlace(dispatch, pid, place)

});

export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(Place)
