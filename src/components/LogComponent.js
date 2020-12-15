import {InputGroup, FormControl} from 'react-bootstrap'
import React from "react";
import {connect} from "react-redux";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import ListGroup from "react-bootstrap/ListGroup";
import {
    addLog,
    deleteLog,
    fetchLogsForTrip,
    updateLog
} from "../actions/logActions";

class Log extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            selectedLogId: '',
            selectedLog: {}
        }
    }

    componentDidMount() {
        this.props.fetchLogsForTrip(this.props.trip._id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.trip._id !== this.props.trip._id) {
            this.props.fetchLogsForTrip(this.props.trip._id)
        }
    }

    handleLogSelect = (eventKey) => {
        this.setState(prevState => {
            return (
                {
                    ...prevState,
                    selectedLogId: eventKey,
                    selectedLog: this.props.logs.find(log => log._id === eventKey)
                }
            )})
    }

    updateLogTitle = (log, event) => {
        this.setState(prevState => {
            return (
                {
                    ...prevState,
                    selectedLog: {...log, title: event.target.value}
                }
            )})
        this.props.updateLog(log._id, {...log, title: event.target.value})
    }

    updateLogDescription = (log, event) => {
        this.setState(prevState => {
            return (
                {
                    ...prevState,
                    selectedLog: {...log, description: event.target.value}
                }
            )})
        this.props.updateLog(log._id, {...log, description: event.target.value})
    }

    edit = () => {
        this.setState(prevState => {
            return (
                {
                    ...prevState,
                    editing: !prevState.editing
                }
            )})
    }

    deleteLog = (logId) => {
        this.props.deleteLog(logId)
        if (logId === this.state.selectedLogId) {
            this.setState(prevState => {
                return (
                    {
                        ...prevState,
                        selectedLogId: '',
                        selectedLog: {}
                    }
                )});
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className='row'>
                    <h3 className="mr-5">Travel Log</h3>
                    {(this.props.userDetails._id === this.props.trip.userId ||
                      (this.props.trip.attendees && this.props.trip.attendees.find(attendee => this.props.userDetails._id === attendee._id))) &&
                     <div>
                         <Button className="m-1"
                                 variant="primary"
                                 onClick={() => this.props.addLog(this.props.trip._id)}>
                             Add Log
                         </Button>
                         {this.state.editing ?
                          <Button variant="outline-info"
                                  onClick={this.edit}>Done</Button> :
                          <Button variant="outline-info"
                                  onClick={this.edit}>Edit</Button>}
                     </div>
                    }
                </div>
                <div className="row">
                    <Nav variant="pills"
                         className="flex-column col-3"
                         onSelect={this.handleLogSelect}
                         defaultActiveKey={this.state.selectedLogId}>
                        {this.props.logs.map(log =>
                                                       (
                                                           <div className="container-fluid my-1">
                                                               <div className="row">
                                                                   <Nav.Item>
                                                                       <Nav.Link eventKey={log._id}>
                                                                           {log.title}
                                                                       </Nav.Link>
                                                                   </Nav.Item>
                                                                   {this.state.editing &&
                                                                    <Button variant="danger" className='ml-2' onClick={() => this.deleteLog(log._id)}>
                                                                        <FontAwesomeIcon icon={faTrash}/>
                                                                    </Button>
                                                                   }
                                                               </div>
                                                           </div>
                                                       )
                        )}
                    </Nav>
                    {this.state.selectedLogId !== '' &&
                     <div className="col-9">
                         <InputGroup className="mb-3">
                             <InputGroup.Prepend>
                                 <InputGroup.Text>Title</InputGroup.Text>
                             </InputGroup.Prepend>
                             {this.state.editing ?
                              <FormControl type="text"
                                           value={this.state.selectedLog.title}
                                           onChange={(e) => this.updateLogTitle(this.state.selectedLog, e)}/> :
                              <FormControl type="text"
                                           readOnly
                                           value={this.state.selectedLog.title}/>
                             }
                         </InputGroup>
                         <h2>Description</h2>
                         {this.state.editing ?
                          <textarea className="form-control"
                                    value={this.state.selectedLog.description === null ?
                                           undefined:
                                           this.state.selectedLog.description}
                                    placeholder="Description..."
                                    onChange={(e) => this.updateLogDescription(this.state.selectedLog, e)}/>:
                          <p>{this.state.selectedLog.description}</p>}
                     </div>
                    }
                </div>
            </div>
        )
    }
}

const stateToPropertyMapper = (state) => ({
    trip: state.tripReducer.selectedTrip,
    userDetails: state.userReducer.userDetails,
    logs: state.logReducer.logs,
});

const propertyToDispatchMapper = (dispatch) => ({
    fetchLogsForTrip: (tid) => fetchLogsForTrip(dispatch, tid),
    addLog: (tid) => addLog(dispatch, tid),
    updateLog: (aid, log) => updateLog(dispatch, aid, log),
    deleteLog: (aid) => deleteLog(dispatch, aid)
});

export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(Log)
