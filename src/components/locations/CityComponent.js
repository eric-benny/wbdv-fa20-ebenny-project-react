import {InputGroup, FormControl} from 'react-bootstrap'
import React from "react";
import {fetchCity, saveCity, updateCity} from "../../actions/locations/cityActions";
import {
    clearPlacesForCity,
    fetchPlacesForCity
} from "../../actions/locations/placeActions";
import {connect} from "react-redux";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

class City extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editing: false
        }
    }

    componentDidMount() {
        const cityId = this.props.match.params.cityId;
        this.props.fetchCity(cityId);
        this.props.fetchPlacesForCity(cityId);
    }

    componentWillUnmount() {
        this.props.clearPlacesForCity()
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

    updateCityNotes = (city, event) => {
        this.props.updateCity({...city, notes: event.target.value})
    }

    updateCityLastVisited = (city, event) => {
        this.props.updateCity({...city, lastVisited: event.target.value})
    }

    saveEdit = (cid, city) => {
        this.edit()
        this.props.saveCity(cid, city)
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
                        <LinkContainer to={this.props.match.params.tripId ?
                                           `/${this.props.match.params.component}/${this.props.match.params.tripId}`:
                                           `/${this.props.match.params.component}`}>
                            <Nav.Link>
                                <FontAwesomeIcon icon={faTimes}/>
                            </Nav.Link>
                        </LinkContainer>
                        <Navbar.Brand>{this.props.city.name}</Navbar.Brand>
                    </Nav>
                    {this.state.editing ?
                     <Button variant="outline-info" onClick={() => this.saveEdit(this.props.city._id, this.props.city)}>
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
                                <FormControl readOnly value={this.props.city.name}/>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Country</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl readOnly value={this.props.city.country}/>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>State/Province</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl readOnly value={this.props.city.state}/>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Last Visited</InputGroup.Text>
                                </InputGroup.Prepend>
                                {this.state.editing ?
                                 <FormControl type="date"
                                              onChange={(e) => this.updateCityLastVisited(this.props.city, e)}
                                              value={this.convertISODate(this.props.city.lastVisited) === null ?
                                                     undefined:
                                                     this.convertISODate(this.props.city.lastVisited)}/>:
                                 <FormControl type="date"
                                              readOnly
                                              value={this.convertISODate(this.props.city.lastVisited) === null ?
                                                     undefined:
                                                     this.convertISODate(this.props.city.lastVisited)}/>}
                            </InputGroup>
                        </div>
                        <div className="col-6">
                            <h2>Notes</h2>
                            {this.state.editing ?
                             <textarea className="form-control"
                                       value={this.props.city.notes === null ?
                                              undefined:
                                              this.props.city.notes}
                                       placeholder="Notes..."
                                       onChange={(e) => this.updateCityNotes(this.props.city, e)}/>:
                             <p>{this.props.city.notes}</p>}
                        </div>
                    </div>
                    <div className="row">
                        <h2>Places</h2>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Details</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.cityPlaces.map(place =>
                                                           (
                                                               <tr key={place._id}>
                                                                   <td>
                                                                       <Link to={`/${this.props.match.params.component}/city/${this.props.city._id}/place/${place._id}`}>
                                                                           {place.name}
                                                                       </Link>
                                                                   </td>
                                                                   <td>{place.details}</td>
                                                               </tr>
                                                           )
                            )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}


const stateToPropertyMapper = (state) => ({
    city: state.cityReducer.selectedCity,
    cityInfo: state.cityReducer.selectedCityInfo,
    cityPlaces: state.placeReducer.placesForCity
});

const propertyToDispatchMapper = (dispatch) => ({
    fetchCity: (cityId) => fetchCity(dispatch, cityId),
    fetchPlacesForCity: (cityId) => fetchPlacesForCity(dispatch, cityId),
    updateCity: (city) => updateCity(dispatch, city),
    saveCity: (cid, city) => saveCity(dispatch, cid, city),
    clearPlacesForCity: () => clearPlacesForCity(dispatch)
});

export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(City)
