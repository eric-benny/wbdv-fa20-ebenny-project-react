import {InputGroup, FormControl} from 'react-bootstrap'
import React from "react";
import Header from "../HeaderComponent";
import {fetchCity} from "../../actions/locations/cityActions";
import {fetchPlacesForCity} from "../../actions/locations/placeActions";
import {connect} from "react-redux";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

class City extends React.Component {

    componentDidMount() {
        const cityId = this.props.match.params.cityId;
        this.props.fetchCity(cityId);
        this.props.fetchPlacesForCity(cityId);
    }

    render() {
        return (
            <div>
                <Header title={this.props.city.name} history={this.props.history}/>
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
                                <FormControl readOnly value="10/15/2015"/>
                            </InputGroup>
                        </div>
                        <div className="col-6">
                            <h2>Notes</h2>
                            <p>{this.props.city.notes}</p>
                        </div>
                    </div>
                    <div className="row">
                        <h2>Places</h2>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.cityPlaces.map(place =>
                                                           (
                                                               <tr>
                                                                   <td>
                                                                       <Link to={`/user/city/${this.props.city.id}/place/${place.id}`}>
                                                                           {place.name}
                                                                       </Link>
                                                                   </td>
                                                                   <td>{place.address}</td>
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
    fetchPlacesForCity: (cityId) => fetchPlacesForCity(dispatch, cityId)
});

export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(City)
