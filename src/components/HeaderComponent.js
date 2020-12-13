import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

const Header = ({title, goBack}) =>
    <Navbar bg="light" variant="light">
        <Nav className="mr-auto">
            <Navbar.Brand href="#">
                <FontAwesomeIcon onClick={goBack} icon={faTimes}/>
            </Navbar.Brand>
            <Navbar.Brand href="">{title}</Navbar.Brand>
        </Nav>
        <Button variant="outline-info">Edit</Button>
    </Navbar>

export default Header
