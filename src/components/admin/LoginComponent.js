import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Navigation from "../NavigationComponent";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () =>
    <div>
        <Navigation/>
        <div className="container">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                {/*TODO: remove hardcoded user id*/}
                <LinkContainer to="/5fc3d9957fa48ff2cf242f36/profile">
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </LinkContainer>
            </Form>
        </div>
    </div>

export default Login
