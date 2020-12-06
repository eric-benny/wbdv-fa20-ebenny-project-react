import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

const Header = ({title, history}) =>
    <Navbar bg="light" variant="light">
        <Nav className="mr-auto">
            {/*TODO: remove hardcoded user id*/}
            {/*<button className="btn" onClick={history.goBack()}>*/}
            {/*    <FontAwesomeIcon icon={faTimes}/>*/}
            {/*</button>*/}
            <LinkContainer to="/5fc3d9957fa48ff2cf242f36/profile">
                <Nav.Link>
                    <FontAwesomeIcon icon={faTimes}/>
                </Nav.Link>
            </LinkContainer>
            <Navbar.Brand href="#home">{title}</Navbar.Brand>
        </Nav>
        <Button variant="outline-info">Edit</Button>
    </Navbar>

export default Header
