import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap";
import userService from "../services/userService";

const logout = () => {
    userService.logoutUser()
        .then(response => {
            if (!response.ok) {
                alert("Unable to logout")
            }
        })
}

const Navigation = ({
    user
                    }) => {
    return (
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="#">Traveler</Navbar.Brand>
            <Nav>
                <LinkContainer to={user ? `/${user}/home` : "/home"}>
                    <Nav.Link>
                        Home
                    </Nav.Link>
                </LinkContainer>
            </Nav>
            <Nav>
                {/*TODO: remove hardcoded user id*/}
                <LinkContainer to={user ? `/${user}/profile` : "/login"}>
                    <Nav.Link>
                        Profile
                    </Nav.Link>
                </LinkContainer>
            </Nav>
            <Nav className="mr-auto">
                {/*TODO: remove hardcoded user id*/}
                <LinkContainer to={user ? `/${user}/search` : "/search"}>
                    <Nav.Link>
                        Search
                    </Nav.Link>
                </LinkContainer>
            </Nav>
            {user &&
             <Nav className="ml-auto">
                 <Navbar.Brand>{user}</Navbar.Brand>
                 <LinkContainer to="/home" onClick={logout}>
                     <Nav.Link>
                         Logout
                     </Nav.Link>
                 </LinkContainer>
             </Nav>
            }
            {!user &&
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



export default Navigation
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


