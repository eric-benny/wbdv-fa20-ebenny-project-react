import Navigation from "./NavigationComponent";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faPlus} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Header from "./HeaderComponent";
import Nav from "react-bootstrap/Nav";
import Pagination from "react-bootstrap/Pagination";
import ListGroup from "react-bootstrap/ListGroup";

const Trip = () => {
    const [key, setKey] = useState("itinerary");
    const handleSelect = (eventKey) => setKey(eventKey);

    let active = 2;
    let days = [];
    for (let number = 1; number <= 5; number++) {
        days.push(
            <Pagination.Item key={number} active={number === active}>
                Day {number}
            </Pagination.Item>,
        );
    }
    days.push(
        <Pagination.Item key={-1}>
            <FontAwesomeIcon icon={faPlus}/>
        </Pagination.Item>,
    );

    return (
        <div>
            <Header title="Foliage"/>
            <div className="container">
                <div className="row mt-2">
                    <Nav variant="tabs" defaultActiveKey="itinerary"
                         onSelect={handleSelect}>
                        <Nav.Item>
                            <Nav.Link eventKey="itinerary">Itinerary</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="places">Places</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="log">
                                Travel Log
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                {key === "itinerary" &&
                 <div>
                     <h1>Itinerary</h1>
                     <Pagination>{days}</Pagination>
                     <ListGroup className="col-6">
                         <ListGroup.Item>Activity 1</ListGroup.Item>
                         <ListGroup.Item>Activity 2</ListGroup.Item>
                         <ListGroup.Item>Activity 3</ListGroup.Item>
                         <ListGroup.Item>Activity 4</ListGroup.Item>
                         <ListGroup.Item>Activity 5</ListGroup.Item>
                     </ListGroup>
                 </div>}
                {key === "places" &&
                 <div>
                    <h1>Places</h1>
                     <Table striped bordered hover>
                         <thead>
                         <tr>
                             <th>Name</th>
                             <th>Country</th>
                             <th>City</th>
                             <th>Visited</th>
                         </tr>
                         </thead>
                         <tbody>
                         <tr>
                             <td>
                                 <Link to="/user/place">
                                     The Louvre
                                 </Link>
                             </td>
                             <td>France</td>
                             <td>Paris</td>
                             <td>
                                 <FontAwesomeIcon icon={faCheck}/>
                             </td>
                         </tr>
                         <tr>
                             <td>
                                 <Link to="/user/place">
                                     Bar Harbor
                                 </Link>
                             </td>
                             <td>United States</td>
                             <td>Maine</td>
                             <td>
                                 <FontAwesomeIcon icon={faCheck}/>
                             </td>
                         </tr>
                         <tr>
                             <td>
                                 <Link to="/user/place">
                                     Madrid
                                 </Link>
                             </td>
                             <td>Sprain</td>
                             <td>Madrid</td>
                             <td></td>
                         </tr>
                         </tbody>
                     </Table>
                 </div>}
                {key === "log" &&
                 <div>
                     <h1>Travel Log</h1>
                     <div className="row">
                         <Nav variant="pills" defaultActiveKey="1" className="flex-column col-3">
                             <Nav.Item>
                                 <Nav.Link eventKey="1">City Day 11/21/15</Nav.Link>
                             </Nav.Item>
                             <Nav.Item>
                                 <Nav.Link eventKey="2">Hike 11/22/15</Nav.Link>
                             </Nav.Item>
                             <Nav.Item>
                                 <Nav.Link eventKey="3">Museum 11/23/15</Nav.Link>
                             </Nav.Item>
                         </Nav>
                         <div className="col-9">
                             <div className="row wbdv-widget-editor">
                                 <div className="container">
                                     <nav
                                         className="navbar navbar-expand-lg navbar-light wbdv-widget-navbar">
                                         <a className="navbar-brand d-none d-sm-inline-block"
                                            href="#">Heading Widget</a>

                                         <button className="navbar-toggler" type="button"
                                                 data-toggle="collapse"
                                                 data-target="#widgetNavbarContent"
                                                 aria-controls="widgetNavbarContent"
                                                 aria-expanded="false"
                                                 aria-label="Toggle navigation">
                                             <span className="navbar-toggler-icon"></span>
                                         </button>

                                         <div className="collapse navbar-collapse"
                                              id="widgetNavbarContent">
                                             <ul className="navbar-nav ml-auto">
                                                 <li className="nav-item active mr-1">
                                                     <a href="#"
                                                        className="nav-link btn btn-warning">
                                                         <i className="fa fa-arrow-up"></i>
                                                     </a>
                                                 </li>
                                                 <li className="nav-item active mr-1">
                                                     <a href="#"
                                                        className="nav-link  btn btn-warning">
                                                         <i className="fa fa-arrow-down"></i>
                                                     </a>
                                                 </li>
                                                 <ul className="navbar-nav mr-1">
                                                     <form className="form-inline nav-item">
                                                         <select className="form-control">
                                                             <option>Heading</option>
                                                             <option>Paragraph</option>
                                                             <option>Image</option>
                                                         </select>
                                                     </form>
                                                 </ul>
                                                 <li className="nav-item active">
                                                     <a href="#"
                                                        className="nav-link btn btn-danger">
                                                         <i className="fa fa-trash"></i>
                                                     </a>
                                                 </li>
                                             </ul>
                                         </div>
                                     </nav>
                                     <form>
                                         <div className="container">
                                             <div className="form-group row">
                                                 <input className="form-control"
                                                        placeholder="Heading Text"/>
                                             </div>
                                             <div className="form-group row">
                                                 <select className="form-control">
                                                     <option>Heading 1</option>
                                                     <option>Heading 2</option>
                                                     <option>Heading 3</option>
                                                     <option>Heading 4</option>
                                                     <option>Heading 5</option>
                                                     <option>Heading 6</option>
                                                 </select>
                                             </div>
                                             <div className="form-group row">
                                                 <input className="form-control"
                                                        placeholder="Heading Text"/>
                                             </div>
                                         </div>
                                     </form>
                                 </div>
                                 <div className="container">
                                     <h3 className="row">
                                         Preview
                                     </h3>
                                     <h1 className="row">
                                         Heading Text
                                     </h1>
                                     <div className="row">
                                         <div className="col-12">
                                             <button
                                                 className="mt-1 btn fa fa-plus fa-lg pull-right"></button>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>}
            </div>
        </div>
    )
}
export default Trip