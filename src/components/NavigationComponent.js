import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap";

const Navigation = () =>
    <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">Traveler</Navbar.Brand>
        <Nav>
            <LinkContainer to="/">
                <Nav.Link>
                    Home
                </Nav.Link>
            </LinkContainer>
        </Nav>
        <Nav>
            {/*TODO: remove hardcoded user id*/}
            <LinkContainer to="/5fc3d9957fa48ff2cf242f36/profile">
                <Nav.Link>
                    Profile
                </Nav.Link>
            </LinkContainer>
        </Nav>
        <Nav className="mr-auto">
            {/*TODO: remove hardcoded user id*/}
            <LinkContainer to="/5fc3d9957fa48ff2cf242f36/search">
                <Nav.Link>
                    Search
                </Nav.Link>
            </LinkContainer>
        </Nav>
        <Nav className="ml-auto">
            <LinkContainer to="/login">
                <Nav.Link>
                    Login
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/signup">
                <Nav.Link>
                    Sign Up
                </Nav.Link>
            </LinkContainer>
        </Nav>
    </Navbar>

export default Navigation
