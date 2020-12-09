import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap";
import userService from "../services/userService";
import {addCity, fetchCitiesForUser} from "../actions/locations/cityActions";
import {fetchTripsForUser} from "../actions/tripActions";
import {connect} from "react-redux";
import {Profile} from "./ProfileComponent";
import {fetchActiveUser, logoutUser} from "../actions/userActions";

// const logout = () => {
//     userService.logoutUser()
//         .then(response => {
//             if (!response.ok) {
//                 alert("Unable to logout")
//             }
//         })
// }

class Navigation extends React.Component {

    componentDidMount() {
        this.props.fetchActiveUser()
    }

    render() {
        return (
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="#">Traveler</Navbar.Brand>
                <Nav>
                    <LinkContainer to="/home">
                        <Nav.Link>
                            Home
                        </Nav.Link>
                    </LinkContainer>
                </Nav>
                <Nav>
                    <LinkContainer to="/profile">
                        <Nav.Link>
                            Profile
                        </Nav.Link>
                    </LinkContainer>
                </Nav>
                <Nav className="mr-auto">
                    <LinkContainer to="/search">
                        <Nav.Link>
                            Search
                        </Nav.Link>
                    </LinkContainer>
                </Nav>
                {this.props.userDetails.username &&
                 <Nav className="ml-auto">
                     <Navbar.Brand>{this.props.userDetails.username}</Navbar.Brand>
                     <LinkContainer to="/home" onClick={this.props.logoutUser}>
                         <Nav.Link>
                             Logout
                         </Nav.Link>
                     </LinkContainer>
                 </Nav>
                }
                {!this.props.userDetails.username &&
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
                }
            </Navbar>
        )
    }
}

const stateToPropertyMapper = (state) => ({
    userDetails: state.userReducer.userDetails
});

const propertyToDispatchMapper = (dispatch) => ({
    fetchActiveUser: () => fetchActiveUser(dispatch),
    logoutUser: () => logoutUser(dispatch)
});


export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(Navigation)


//                <Navbar bg="light" variant="light">
//                                           <Navbar.Brand href="#">Traveler</Navbar.Brand>
// <Nav>
//     <LinkContainer to={user ? `/${user}/home` : "/home"}>
//         <Nav.Link>
//             Home
//         </Nav.Link>
//     </LinkContainer>
// </Nav>
// <Nav>
// <LinkContainer to={user ? `/${user}/profile` : "/login"}>
//                                                         <Nav.Link>
//                                                         Profile
//                                                         </Nav.Link>
// </LinkContainer>
// </Nav>
// <Nav className="mr-auto">
// <LinkContainer to={user ? `/${user}/search` : "/search"}>
// <Nav.Link>
// Search
// </Nav.Link>
// </LinkContainer>
// </Nav>
// {user &&
// <Nav className="ml-auto">
// <Navbar.Brand>{user}</Navbar.Brand>
// <LinkContainer to="/home" onClick={logout}>
// <Nav.Link>
// Logout
// </Nav.Link>
// </LinkContainer>
// </Nav>
// }
// {!user &&
// <Nav className="ml-auto">
// <LinkContainer to="/login">
// <Nav.Link>
// Login
// </Nav.Link>
// </LinkContainer>
// <LinkContainer to="/signup">
// <Nav.Link>
// Sign Up
// </Nav.Link>
// </LinkContainer>
// </Nav>
// }
// </Navbar>



// class Navigation extends React.Component {
//
//     constructor(props) {
//         super(props);
//     }
//
//     // state = {
//     //     login: false
//     // }
//     //
//     // componentDidUpdate(prevProps, prevState, snapshot) {
//     //     if (prevProps.match.params.userId !== this.props.match.params.userId) {
//     //         if (this.props.match.params.userId) {
//     //             this.setState(prevState => ({
//     //                 ...prevState,
//     //                 login: true
//     //             }))
//     //         } else {
//     //             this.setState(prevState => ({
//     //                 ...prevState,
//     //                 login: false
//     //             }))
//     //         }
//     //     }
//     // }
//
//     logout = () => {
//         userService.logoutUser()
//             .then(response => {
//                 if (response.ok) {
//                     this.props.history.push("#home")
//                 } else {
//                     alert("Unable to logout")
//                 }
//             })
//     }
//
//     render() {
//         return (
//             <Navbar bg="light" variant="light">
//                 <Navbar.Brand href="#home">Traveler</Navbar.Brand>
//                 <Nav>
//                     <LinkContainer to="/">
//                         <Nav.Link>
//                             Home
//                         </Nav.Link>
//                     </LinkContainer>
//                 </Nav>
//                 <Nav>
//                     {/*TODO: remove hardcoded user id*/}
//                     <LinkContainer to={`/${this.props.match.params.userId}/profile`}>
//                         <Nav.Link>
//                             Profile
//                         </Nav.Link>
//                     </LinkContainer>
//                 </Nav>
//                 <Nav className="mr-auto">
//                     {/*TODO: remove hardcoded user id*/}
//                     <LinkContainer to={`/${this.props.match.params.userId}/search`}>
//                         <Nav.Link>
//                             Search
//                         </Nav.Link>
//                     </LinkContainer>
//                 </Nav>
//                 { this.props.match.params.userId &&
//                   <Nav className="ml-auto">
//                       <Navbar.Brand>this.props.match.params.userId</Navbar.Brand>
//                       <LinkContainer onClick={this.logout}>
//                           <Nav.Link>
//                               Logout
//                           </Nav.Link>
//                       </LinkContainer>
//                   </Nav>
//                 }
//                 { !this.props.match.params.userId &&
//                   <Nav className="ml-auto">
//                       <LinkContainer to="/login">
//                           <Nav.Link>
//                               Login
//                           </Nav.Link>
//                       </LinkContainer>
//                       <LinkContainer to="/signup">
//                           <Nav.Link>
//                               Sign Up
//                           </Nav.Link>
//                       </LinkContainer>
//                   </Nav>
//                 }
//
//             </Navbar>
//         )
//     }
// }


