import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Navigation from "../NavigationComponent";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import userService from "../../services/userService";
import {fetchActiveUser, fetchAllUsers, saveUser} from "../../actions/userActions";
import {connect} from "react-redux";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTrash} from "@fortawesome/free-solid-svg-icons";

const loginUser = (event) => {
    event.preventDefault();
    userService.loginUser()
}

class UserAdmin extends React.Component {

    state = {
        username: '',
        password: ''
    }

    componentDidMount() {
        this.props.fetchAllUsers()
    }

    handleAdminChange = (event) => {
        const newUsername = event.target.value
        this.setState(prevState => ({
            ...prevState,
            username: newUsername
        }))
    }

    changeUserRole = (user) => {
        const newUser = {...user, admin: !user.admin}
        this.props.saveUser(user._id, newUser)
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h2>Users</h2>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Update Role</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.users.map(user => {
                                                      return (
                                                          <tr key={user._id}>
                                                              <td>
                                                                  <Link
                                                                      to={`/profile/${user._id}`}>
                                                                      {user.username}
                                                                  </Link>
                                                              </td>
                                                              <td>
                                                                  {user.firstName}
                                                              </td>
                                                              <td>
                                                                  {user.lastName}
                                                              </td>
                                                              <td>
                                                                  {user.email}
                                                              </td>
                                                              <td>
                                                                  {user.admin &&
                                                                   <FontAwesomeIcon
                                                                       icon={faCheck}/>}
                                                              </td>
                                                              {user.admin &&
                                                               <td>
                                                                   <Button
                                                                       className="table_delete"
                                                                       variant="danger"
                                                                       onClick={() => this.changeUserRole(user)}>
                                                                       Revoke Admin
                                                                   </Button>
                                                               </td>}
                                                              {!user.admin &&
                                                               <td>
                                                                   <Button
                                                                       className="table_delete"
                                                                       variant="danger"
                                                                       onClick={() => this.changeUserRole(user)}>
                                                                       Make Admin
                                                                   </Button>
                                                               </td>}
                                                          </tr>
                                                      )
                                                  }
                        )}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

const stateToPropertyMapper = (state) => ({
    userDetails: state.userReducer.userDetails,
    users: state.userReducer.allUsers
});

const propertyToDispatchMapper = (dispatch) => ({
    fetchActiveUser: () => fetchActiveUser(dispatch),
    fetchAllUsers: () => fetchAllUsers(dispatch),
    saveUser: (uid, user) => saveUser(dispatch, uid, user)
});


export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(UserAdmin)
