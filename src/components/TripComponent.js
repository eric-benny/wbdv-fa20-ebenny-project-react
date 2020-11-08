import Navigation from "./NavigationComponent";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Header from "./HeaderComponent";
import Nav from "react-bootstrap/Nav";

const Trip = () => {
    const [key, setKey] = useState("itinerary");
    const handleSelect = (eventKey) => setKey(eventKey);

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
                 <h1>Itinerary</h1>}
                {key === "places" &&
                 <h1>Places</h1>}
                {key === "log" &&
                 <h1>Travel Log</h1>}
            </div>
        </div>
    )
}
export default Trip