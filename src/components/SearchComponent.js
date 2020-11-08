import React from "react";
import Navigation from "./NavigationComponent";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Search = () =>
    <div>
        <Navigation/>
        <div className="container">
            <Form>
                <Form.Group controlId="formSearch">
                    <Form.Label>Location Search</Form.Label>
                    <Form.Control type="text" placeholder="Start typing a place name" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Search
                </Button>
            </Form>
        </div>
    </div>

export default Search