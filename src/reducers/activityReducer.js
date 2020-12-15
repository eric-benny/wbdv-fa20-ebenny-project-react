import {
    ADD_ACTIVITY,
    DELETE_ACTIVITY,
    FIND_ACTIVITIES_FOR_TRIP,
    UPDATE_ACTIVITY
} from "../actions/activityActions";

const initialState = {
    activities: [],
}

const activityReducer = (state=initialState, action) => {
    switch(action.type) {
        case ADD_ACTIVITY:
            return {
                ...state,
                activities: [...state.activities, action.newActivity]
            }
        case FIND_ACTIVITIES_FOR_TRIP:
            return {
                ...state,
                activities: action.activities
            }
        case UPDATE_ACTIVITY:
            return {
                ...state,
                activities: state.activities.map(activity => activity._id === action.activity._id ? action.activity: activity)
            }
        case DELETE_ACTIVITY:
            return {
                ...state,
                activities: state.activities.filter(activity => activity._id !== action.aid)
            }
        default:
            return state
    }
};

export default activityReducer
