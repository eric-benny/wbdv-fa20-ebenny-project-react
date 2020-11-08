import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {LinkContainer} from "react-router-bootstrap";
import Navigation from "../NavigationComponent";

const SignUp = () =>
    <div>
        <Navigation/>
        <div className="container">
            <Form>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="test" placeholder="Enter name" />
                </Form.Group>
                <Form.Group controlId="formCountry">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter country" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Public" />
                </Form.Group>
                <LinkContainer to="/">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </LinkContainer>
            </Form>
        </div>
    </div>

export default SignUp