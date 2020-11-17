import {FETCH_TRIP} from "../actions/tripActions";

const initialState = {
    userTrips: [
        {
            id:123,
            name:"Paris Trip",
            date:"10/10/2022",
            cities: [
                {
                 id: 11875708,
                 places: [123,789]
                }
            ],
            itinerary: "",
            travelLog: ""
        },
        {
            id:456,
            name:"Foliage",
            date:"10/10/2022",
            cities: [
                {

                }
            ],
            itinerary: "",
            travelLog: ""
        },
        {
            id:789,
            name:"Summer Vacation",
            date:"10/10/2022",
            cities: [
                {
                    id: 4347242,
                    places: [34897]
                }
            ],
            itinerary: "",
            travelLog: ""
        },
        {
            id:4587,
            name:"History Trip",
            date:"10/10/2022",
            cities: [
                {

                }
            ],
            itinerary: "",
            travelLog: ""
        }
    ],
    selectedTrip: {}
}

const tripReducer = (state=initialState, action) => {
    switch(action.type) {
        case FETCH_TRIP:
            return {
                ...state,
                selectedTrip: state.userTrips.find(trip => trip.id === action.tripId)
            }
        default:
            return state
    }
};

export default tripReducer
