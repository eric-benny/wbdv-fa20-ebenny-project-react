
export const FETCH_TRIP = 'FETCH_TRIP';

export const fetchTrip = (dispatch, tripId) => {
    dispatch({ type: FETCH_TRIP, tripId })
}
