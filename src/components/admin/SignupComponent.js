import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {LinkContainer} from "react-router-bootstrap";
import Navigation from "../NavigationComponent";
import userService from "../../services/userService";

class SignUp extends React.Component {

    state = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        admin: false
    }

    registerUser = (event) => {
        event.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            admin: this.state.admin
        }
        console.log(user)
        userService.registerUser(user)
            .then(response => {
                if (isNaN(response)) {
                    this.props.history.push(`/profile`)
                }
            })

    }

    handleLastNameChange = (event) => {
        const newLastName = event.target.value
        this.setState(prevState => ({
            ...prevState,
            lastName: newLastName
        }))
    }

    handleFirstNameChange = (event) => {
        const newFirstName = event.target.value
        this.setState(prevState => ({
            ...prevState,
            firstName: newFirstName
        }))
    }

    handleEmailChange = (event) => {
        const newEmail = event.target.value
        this.setState(prevState => ({
            ...prevState,
            email: newEmail
        }))
    }

    handleUsernameChange = (event) => {
        const newUsername = event.target.value
        this.setState(prevState => ({
            ...prevState,
            username: newUsername
        }))
    }

    handlePasswordChange = (event) => {
        const newPassword = event.target.value
        this.setState(prevState => ({
            ...prevState,
            password: newPassword
        }))
    }

    setAdmin = () => {
        this.setState(prevState => ({
            ...prevState,
            admin: !prevState.admin
        }))
    }

    render() {
        return (
            <div>
                <div className="container">
                    <Form onSubmit={this.registerUser}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="test"
                                          placeholder="Enter username"
                                          value={this.state.username}
                                          onChange={this.handleUsernameChange}/>
                        </Form.Group>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="test"
                                          placeholder="Enter first name"
                                          value={this.state.firstName}
                                          onChange={this.handleFirstNameChange}/>
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="test"
                                          placeholder="Enter last name"
                                          value={this.state.lastName}
                                          onChange={this.handleLastNameChange} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email"
                                          placeholder="Enter email"
                                          value={this.state.email}
                                          onChange={this.handleEmailChange} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                          placeholder="Password"
                                          value={this.state.password}
                                          onChange={this.handlePasswordChange}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox"
                                        label="Admin"
                                        onChange={this.setAdmin}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}


export default SignUp
