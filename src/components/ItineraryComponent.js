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
    addActivity,
    deleteActivity,
    fetchActivitiesForTrip,
    updateActivity
} from "../actions/activityActions";

class Itinerary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            selectedActivityId: '',
            selectedActivity: {}
        }
    }

    componentDidMount() {
        this.props.fetchActivitiesForTrip(this.props.trip._id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.trip._id !== this.props.trip._id) {
            this.props.fetchActivitiesForTrip(this.props.trip._id)
        }
    }

    handleActivitySelect = (eventKey) => {
        this.setState(prevState => {
            return (
                {
                    ...prevState,
                    selectedActivityId: eventKey,
                    selectedActivity: this.props.activities.find(activity => activity._id === eventKey)
                }
            )})
    }

    convertISODate = (isoDate) => {
        if (isoDate === null) {
            return isoDate
        } else {
            const date = new Date(isoDate);
            const year = date.getFullYear();
            let month = date.getMonth()+1;
            let dt = date.getDate()+1;

            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }
            return year + '-' + month + '-' + dt;
        }
    }

    updateActivityTitle = (activity, event) => {
        this.setState(prevState => {
            return (
                {
                    ...prevState,
                    selectedActivity: {...activity, title: event.target.value}
                }
            )})
        this.props.updateActivity(activity._id, {...activity, title: event.target.value})
    }

    updateActivityDate = (activity, event) => {
        this.setState(prevState => {
            return (
                {
                    ...prevState,
                    selectedActivity: {...activity, date: event.target.value}
                }
            )})
        this.props.updateActivity(activity._id, {...activity, date: event.target.value})
    }

    updateActivityNotes = (activity, event) => {
        this.setState(prevState => {
            return (
                {
                    ...prevState,
                    selectedActivity: {...activity, notes: event.target.value}
                }
            )})
        this.props.updateActivity(activity._id, {...activity, notes: event.target.value})
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

    deleteActivity = (activityId) => {
        this.props.deleteActivity(activityId)
        if (activityId === this.state.selectedActivityId) {
            this.setState(prevState => {
                return (
                    {
                        ...prevState,
                        selectedActivityId: '',
                        selectedActivity: {}
                    }
                )});
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className='row'>
                    <h3 className="mr-5">Itinerary</h3>
                    {this.props.userDetails._id === this.props.trip.userId &&
                     <div>
                         <Button className="m-1"
                                 variant="primary"
                                 onClick={() => this.props.addActivity(this.props.trip._id)}>
                             Add Activity
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
                         onSelect={this.handleActivitySelect}
                         defaultActiveKey={this.state.selectedActivityId}>
                        {this.props.activities.map(activity =>
                              (
                                  <div className="container-fluid my-1">
                                      <div className="row">
                                          <Nav.Item>
                                              <Nav.Link eventKey={activity._id}>
                                                  {activity.title}
                                              </Nav.Link>
                                          </Nav.Item>
                                          {this.state.editing &&
                                           <Button variant="danger" className='ml-2' onClick={() => this.deleteActivity(activity._id)}>
                                               <FontAwesomeIcon icon={faTrash}/>
                                           </Button>
                                          }
                                      </div>
                                  </div>
                              )
                        )}
                    </Nav>
                    {this.state.selectedActivityId !== '' &&
                     <div className="col-9">
                         <InputGroup className="mb-3">
                             <InputGroup.Prepend>
                                 <InputGroup.Text>Title</InputGroup.Text>
                             </InputGroup.Prepend>
                             {this.state.editing ?
                              <FormControl type="text"
                                           value={this.state.selectedActivity.title}
                                           onChange={(e) => this.updateActivityTitle(this.state.selectedActivity, e)}/> :
                              <FormControl type="text"
                                           readOnly
                                           value={this.state.selectedActivity.title}/>
                             }
                         </InputGroup>
                         <InputGroup className="mb-3">
                             <InputGroup.Prepend>
                                 <InputGroup.Text>Date</InputGroup.Text>
                             </InputGroup.Prepend>
                             {this.state.editing ?
                              <FormControl type="date"
                                           onChange={(e) => this.updateActivityDate(this.state.selectedActivity, e)}
                                           value={this.convertISODate(this.state.selectedActivity.date) === null ?
                                                  undefined:
                                                  this.convertISODate(this.state.selectedActivity.date)}/>:
                              <FormControl type="date"
                                           readOnly
                                           value={this.convertISODate(this.state.selectedActivity.date) === null ?
                                                  undefined:
                                                  this.convertISODate(this.state.selectedActivity.date)}/>}
                         </InputGroup>
                         <h2>Notes</h2>
                         {this.state.editing ?
                          <textarea className="form-control"
                                    value={this.state.selectedActivity.notes === null ?
                                           undefined:
                                           this.state.selectedActivity.notes}
                                    placeholder="Notes..."
                                    onChange={(e) => this.updateActivityNotes(this.state.selectedActivity, e)}/>:
                          <p>{this.state.selectedActivity.notes}</p>}
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
    activities: state.activityReducer.activities,
});

const propertyToDispatchMapper = (dispatch) => ({
    fetchActivitiesForTrip: (tid) => fetchActivitiesForTrip(dispatch, tid),
    addActivity: (tid) => addActivity(dispatch, tid),
    updateActivity: (aid, activity) => updateActivity(dispatch, aid, activity),
    deleteActivity: (aid) => deleteActivity(dispatch, aid)
});

export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(Itinerary)
