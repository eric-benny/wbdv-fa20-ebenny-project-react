import React from "react";
import Navigation from "../NavigationComponent";
import '../../css/searchStyle.css'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import {
    executeCitySearch,
    updateAutofillCities,
    updateSearchCity
} from "../../actions/search/citySearchActions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {addCity} from "../../actions/locations/cityActions";


class SearchComponent extends React.Component {

    onInputChange = (event) => {
        this.props.updateSearchCity(event.target.value);
        this.props.updateAutofillCities(event.target.value)
    };

    onSelect = (cityName) => {
        this.props.updateSearchCity(cityName)
        this.props.updateAutofillCities('')
    };

    search = () => {
        this.props.updateAutofillCities('')
        this.props.executeCitySearch(this.props.searchCity)
    }

    render() {

        return(
            <div>
                <Navigation/>
                <div className="container my-2">
                    <Form>
                        <Form.Group as={Row} controlId="formSearch" className="mb-0">
                            <Form.Label column sm="2">Location Search</Form.Label>
                            <Col sm="8" >
                                <Form.Control type="text"
                                              autoComplete="off"
                                              placeholder="Start typing a place name"
                                              value={this.props.searchCity}
                                              onChange={this.onInputChange}/>
                            </Col>
                            <Col sm="2">
                                <Button variant="primary" onClick={this.search}>
                                    Search
                                </Button>
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col sm={{ span: 8, offset: 2 }} className="my-0 py-0">
                            <ListGroup>
                                {this.props.autofillCities.map(city =>
                                    <ListGroup.Item className="py-1 px-2"
                                                    key={city.geonameId}
                                                    variant="light"
                                                    onClick={() => this.onSelect(city.toponymName)}
                                                    action={true}>
                                        {city.toponymName}
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                            </Col>
                        </Row>
                    </Form>
                    <Row>
                        {this.props.searchResults.length > 0 &&
                         <Table className="my-2">
                             <thead>
                             <tr>
                                 <th>Name</th>
                                 <th>Country</th>
                                 <th>Population</th>
                             </tr>
                             </thead>
                             <tbody>
                             {this.props.searchResults.map(city => {
                                 return (
                                                               <tr key={city.id}>
                                                                   <th>{ city.name }</th>
                                                                   <th>{ city.countryName }</th>
                                                                   <th>{ city.population }</th>
                                                                   <th>
                                                                       <Button primary className="fa fa-plus fa-lg" onClick={() => this.props.addCity(city)}/>
                                                                   </th>
                                                               </tr>
                                                           )}
                             )}
                             </tbody>
                         </Table>
                        }
                    </Row>
                </div>
            </div>
        )
    }

}

const stateToPropertyMapper = (state) => ({
    autofillCities: state.searchReducer.autofillCities,
    searchCity: state.searchReducer.searchCity,
    searchResults: state.searchReducer.searchResults
});

const propertyToDispatchMapper = (dispatch) => ({
    updateAutofillCities: (cityInput) => updateAutofillCities(dispatch, cityInput),
    updateSearchCity: (searchCity) => updateSearchCity(dispatch, searchCity),
    executeCitySearch: (city) => executeCitySearch(dispatch, city),
    addCity: (city) => addCity(dispatch, city)
});


export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(SearchComponent)
