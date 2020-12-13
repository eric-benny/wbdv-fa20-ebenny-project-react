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
import {addCity, fetchCitiesForUser} from "../../actions/locations/cityActions";



const PlaceSearchComponent = (
    {
        search,
        searchPlace='',
        onInputChange,
        autofillPlaces=[],
        searchResults=[],
        userCities=[],
        userPlaces=[],
        userDetails={},
        addPlace,
        onSelect,
        selectedCityId='',
        handleSelectedCityChange
    }) =>
    <div>
        <div className="container my-2">
            <Form onSubmit={search}>
                <Form.Group as={Row} controlId="formSearch" className="mb-0">
                    <Form.Label column sm="2">Place Search</Form.Label>
                    <Col sm="8" >
                        <Form.Control type="text"
                                      autoComplete="off"
                                      placeholder="Start typing a place name"
                                      value={searchPlace}
                                      onChange={onInputChange}/>
                    </Col>
                    <Col sm="2">
                        <Button variant="primary" type="submit">
                            Search
                        </Button>
                    </Col>
                </Form.Group>
                <Row>
                    <Col sm={{ span: 8, offset: 2 }} className="my-0 py-0">
                        <ListGroup>
                            {autofillPlaces.map(place =>
                                                    <ListGroup.Item className="py-1 px-2"
                                                                    key={place.osm_id}
                                                                    variant="light"
                                                                    onClick={() => onSelect(
                                                                        place.display_place)}
                                                                    action={true}>
                                                        {place.display_place}
                                                    </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Col>
                </Row>
            </Form>
            <Row>
                {searchResults.length > 0 &&
                 <Table className="my-2">
                     <thead>
                     <tr>
                         <th>Name</th>
                         <th>Category</th>
                         <th>Details</th>
                         <th>
                             <select placeholder="select a city" onChange={handleSelectedCityChange} value={selectedCityId}>
                                 <option key="1" value="" disabled>Select a city...</option>
                                 {userCities.map(city =>
                                                     <option key={city._id} value={city._id}>{city.name}</option>)}
                             </select>
                         </th>
                     </tr>
                     </thead>
                     <tbody>
                     {searchResults.map(place => {
                         if(userPlaces.find(userPlace => {
                             return userPlace.infoId === place.id
                         })) {
                             return (
                                 <tr key={place.id}>
                                     <th>{place.name}</th>
                                     <th>{place.type}</th>
                                     <th>{place.details}</th>
                                     <th>
                                         added
                                     </th>
                                 </tr>
                             )
                         } else {
                             return (
                                 <tr key={place.id}>
                                     <th>{place.name}</th>
                                     <th>{place.type}</th>
                                     <th>{place.details}</th>
                                     <th>
                                         <Button className={userDetails._id ? "fa fa-plus fa-lg": "fa fa-plus fa-lg disabled"}
                                                 onClick={() => addPlace(
                                                     userDetails._id,
                                                     selectedCityId,
                                                     place)}/>
                                     </th>
                                 </tr>
                             )
                         }}
                     )}
                     </tbody>
                 </Table>
                }
            </Row>
        </div>
    </div>

export default PlaceSearchComponent
// const stateToPropertyMapper = (state) => ({
//     userDetails: state.userReducer.userDetails,
//     autofillCities: state.searchReducer.autofillCities,
//     searchCity: state.searchReducer.searchCity,
//     searchResults: state.searchReducer.searchResults,
//     userCities: state.cityReducer.userCities
// });
//
// const propertyToDispatchMapper = (dispatch) => ({
//     fetchCitiesForUser: (uid) => fetchCitiesForUser(dispatch, uid),
//     updateAutofillCities: (cityInput) => updateAutofillCities(dispatch, cityInput),
//     updateSearchCity: (searchCity) => updateSearchCity(dispatch, searchCity),
//     executeCitySearch: (city) => executeCitySearch(dispatch, city),
//     addCity: (uid, city) => addCity(dispatch, uid, city)
// });
//
//
// export default connect
// (stateToPropertyMapper, propertyToDispatchMapper)
// (PlaceSearchComponent)
