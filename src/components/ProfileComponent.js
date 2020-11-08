import React from "react";
import Navigation from "./NavigationComponent";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck} from "@fortawesome/free-solid-svg-icons";

const Profile = () =>
    <div>
        <Navigation/>
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <h2>Trips</h2>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Country</th>
                            <th>City</th>
                            <th>Start Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <Link to="/user/trip">
                                    Foliage
                                </Link>
                            </td>
                            <td>United States</td>
                            <td>Lincoln, NH</td>
                            <td>10/10/2022</td>
                        </tr>
                        <tr>
                            <td>
                                <Link to="/user/trip">
                                    Summer Vacation
                                </Link>
                            </td>
                            <td>Spain</td>
                            <td>Madrid</td>
                            <td>7/15/2022</td>
                        </tr>
                        <tr>
                            <td>
                                <Link to="/user/trip">
                                    History Vacation
                                </Link>
                            </td>
                            <td>Italy</td>
                            <td>Rome</td>
                            <td>7/15/2023</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="col-6">
                    <h2>Places</h2>
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
                                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
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
                                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
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
                </div>
            </div>
        </div>
    </div>

export default Profile