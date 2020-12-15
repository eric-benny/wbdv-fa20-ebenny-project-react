import React from "react";
import '../../css/searchStyle.css'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck} from "@fortawesome/free-solid-svg-icons";

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
        handleSelectedCityChange,
        handleShow,
        handleClose,
        modalShow,
        selectPlace,
        placeDetail
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
                                     <th>
                                         <Button onClick={() => selectPlace(place.id, place.idType)}
                                                 variant="link">
                                             {place.name}
                                         </Button>
                                     </th>
                                     <th>{place.type}</th>
                                     <th>
                                         added
                                     </th>
                                 </tr>
                             )
                         } else {
                             return (
                                 <tr key={place.id}>
                                     <th>
                                         <Button onClick={() => selectPlace(place.id, place.idType)}
                                                 variant="link">
                                             {place.name}
                                         </Button>
                                     </th>
                                     <th>{place.type}</th>
                                     <th>
                                         <Button className="fa fa-plus fa-lg"
                                                 disabled={!userDetails._id}
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
        <Modal show={modalShow} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{(placeDetail.namedetails && placeDetail.namedetails.name) ? placeDetail.namedetails.name: placeDetail.display_name}</Modal.Title>
                {userPlaces.find(userPlace => {
                    return userPlace.infoId === placeDetail.osm_id
                }) &&
                 <FontAwesomeIcon className="m-2" icon={faCheck}/>}
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col md={6}>
                            <h4 className="row">Address</h4>
                            {placeDetail.address && Object.keys(placeDetail.address).map(function(key) {
                                return <p className="whiteSpaceNoWrap row">{ `${key}: ${placeDetail.address[key]}` }</p>
                            })}
                        </Col>
                        <Col md={6}>
                            <h4 className="row">Info</h4>
                            {placeDetail.extratags && Object.keys(placeDetail.extratags).map(function(key) {
                                return <p className="whiteSpaceNoWrap row">{ `${key}: ${placeDetail.extratags[key]}` }</p>
                            })}
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </div>;

export default PlaceSearchComponent
