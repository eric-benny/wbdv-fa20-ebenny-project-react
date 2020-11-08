import Navigation from "./NavigationComponent";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {Row, Col, InputGroup, FormControl} from 'react-bootstrap'
import Form from "react-bootstrap/Form";
import React from "react";
import Header from "./HeaderComponent";

const Place = () =>
    <div>
        <Header title="The Louvre"/>
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <h2>Information</h2>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Name</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl readOnly value="The Louvre"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Country</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl readOnly value="France"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>City</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl readOnly value="Paris"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Last Visited</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl readOnly value="10/15/2015"/>
                    </InputGroup>
                </div>
                <div className="col-6">
                    <h2>Notes</h2>
                    <p>This is a space to store notes about a place. Things like tip about where and when to go. Things you want to do there. Reminders for when you visit again.</p>
                </div>
            </div>
        </div>
    </div>

export default Place