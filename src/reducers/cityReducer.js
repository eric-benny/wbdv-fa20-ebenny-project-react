import {ADD_CITY, FETCH_CITY, FIND_CITIES_FOR_TRIP} from "../actions/locations/cityActions";

const tempCitiesForTrip = [
    {
        id: 11875708,
        places: [123,789]
    }
]

const initialState = {
    userCities: [
        {
            id:11875708,
            name:"Métropole du Grand Paris",
            population:7070000,
            countryName:"France",
            longitude:"2.37077",
            latitude:"48.79591",
            state: "FR"
        },
        {
            id:4347242,
            name:"Annapolis",
            population:39474,
            countryName:"United States",
            longitude:"-76.49184",
            latitude:"38.97859",
            state: "MD"
        },
        {
            id:6942553,
            name:"Paris",
            population:11177,
            countryName:"Canada",
            longitude:"-80.38333",
            latitude:"43.2",
            state: "ON"

        },
        {
            id:830708,
            name:"Varsinais-Suomi",
            population:470880,
            countryName:"Finland",
            longitude:"22.25",
            latitude:"60.5",
            state: "FIN"
        }
    ],
    selectedCity: {},
    citiesForTrip: []
}

const cityReducer = (state=initialState, action) => {
    switch(action.type) {
        case ADD_CITY:
            return {
                ...state,
                userCities: [ ...state.userCities, action.city ]
            };
        case FETCH_CITY:
            return {
                ...state,
                selectedCity: state.userCities.find(city => city.id === action.cityId)
            };
        case FIND_CITIES_FOR_TRIP:
            return {
                ...state,
                citiesForTrip: state.userCities.filter(city => tempCitiesForTrip.some(tripCity => tripCity.id === city.id))
            }
        default:
            return state
    }
};

export default cityReducer
