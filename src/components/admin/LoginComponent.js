import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Navigation from "../NavigationComponent";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import userService from "../../services/userService";

const loginUser = (event) => {
    event.preventDefault();
    userService.loginUser()
}

class Login extends React.Component {

    state = {
        username: '',
        password: ''
    }

    loginUser = (event) => {
        event.preventDefault();
        userService.loginUser(this.state.username, this.state.password)
            .then(response => {
                if (isNaN(response)) {
                    this.props.history.push(`/${response._id}/profile`)
                }
            })

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

    render() {
        return (
            <div>
                <Navigation/>
                <div className="container">
                    <Form onSubmit={this.loginUser}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter username"
                                          value={this.state.username}
                                          onChange={this.handleUsernameChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                          placeholder="Password"
                                          value={this.state.password}
                                          onChange={this.handlePasswordChange}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Login
