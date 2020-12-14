import React from "react";
import Navigation from "../NavigationComponent";
import '../../css/searchStyle.css'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";


const CitySearchComponent = (
    {
        search,
        searchCity='',
        onInputChange,
        autofillCities=[],
        searchResults=[],
        userCities=[],
        userDetails={},
        addCity,
        onSelect
    }) =>
        <div>
            <div className="container my-2">
                <Form onSubmit={search}>
                    <Form.Group as={Row} controlId="formSearch" className="mb-0">
                        <Form.Label column sm="2">City Search</Form.Label>
                        <Col sm="8" >
                            <Form.Control type="text"
                                          autoComplete="off"
                                          placeholder="Start typing a place name"
                                          value={searchCity}
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
                                {autofillCities.map(city =>
                                                        <ListGroup.Item className="py-1 px-2"
                                                                        key={city.geonameId}
                                                                        variant="light"
                                                                        onClick={() => onSelect(
                                                                            city.toponymName)}
                                                                        action={true}>
                                                            {city.toponymName}
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
                             <th>Country</th>
                             <th>Population</th>
                             <th>State/Province</th>
                             <th/>
                         </tr>
                         </thead>
                         <tbody>
                         {searchResults.map(city => {
                             if(userCities.find(userCity => {
                                 return parseInt(userCity.infoId) === city.id
                             })) {
                                 return (
                                     <tr key={city.id}>
                                         <th>{city.name}</th>
                                         <th>{city.country}</th>
                                         <th>{city.population}</th>
                                         <th>{city.state}</th>
                                         <th>
                                             added
                                         </th>
                                     </tr>
                                 )
                             } else {
                                 return (
                                     <tr key={city.id}>
                                         <th>{city.name}</th>
                                         <th>{city.country}</th>
                                         <th>{city.population}</th>
                                         <th>{city.state}</th>
                                         <th>
                                             <Button className="fa fa-plus fa-lg"
                                                     disabled={!userDetails._id}
                                                     onClick={() => addCity(
                                                         userDetails._id,
                                                         city)}/>
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

export default CitySearchComponent
