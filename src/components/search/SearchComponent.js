import React from "react";
import '../../css/searchStyle.css'
import {connect} from "react-redux";
import {
    clearCityResults,
    executeCitySearch,
    updateAutofillCities,
    updateSearchCity
} from "../../actions/search/citySearchActions";
import {addCity, fetchCitiesForUser} from "../../actions/locations/cityActions";
import Nav from "react-bootstrap/Nav";
import CitySearchComponent from "./CitySearchComponent";
import PlaceSearchComponent from "./PlaceSearchComponent";
import {
    clearPlaceResults,
    executePlaceSearch,
    updateAutofillPlaces,
    updateSearchPlace
} from "../../actions/search/placeSearchActions";
import {addPlace, fetchPlacesForUser} from "../../actions/locations/placeActions";


class SearchComponent extends React.Component {

    constructor(props) {
        super(props);
        const type = this.props.match.params.type;
        this.state = {
            key: type,
            selectedCityId: ''
        }
    }

    componentDidMount() {
        const query = this.props.match.params.query;
        const type = this.props.match.params.type;

        this.props.fetchCitiesForUser(this.props.userDetails._id);
        this.props.fetchPlacesForUser(this.props.userDetails._id);

        if (query) {
            if (type === 'citySearch') {
                this.props.updateSearchCity(query);
                this.searchForCity(query)
            } else if (type === 'placeSearch') {
                this.props.updateSearchPlace(query);
                this.searchForPlace(query)
            }

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const query = this.props.match.params.query;
        const type = this.props.match.params.type;

        if (prevProps.userDetails._id !== this.props.userDetails._id) {
            if (this.props.userDetails._id) {
                this.props.fetchCitiesForUser(this.props.userDetails._id);
                this.props.fetchPlacesForUser(this.props.userDetails._id);
            }
        }

        if (prevProps.match.params.query !== query) {
            if (type === 'citySearch') {
                if (query && prevProps.searchCity !== query) {
                    this.props.updateSearchCity(query);
                    this.searchForCity(query)
                } else if (!query || query === '') {
                    this.props.updateSearchCity('');
                    this.props.clearCityResults()
                }
            } else if (type === 'placeSearch') {
                if (query && prevProps.searchPlace !== query) {
                    this.props.updateSearchPlace(query);
                    this.searchForPlace(query)
                } else if (!query || query === '') {
                    this.props.updateSearchPlace('');
                    this.props.clearPlaceResults()
                }
            }
        }
    }

    handleSelectedCityChange = (event) => {
        this.setState(prevState => {
            return (
                {
                    ...prevState,
                    selectedCityId: event.target.value
                }
            )})
    };

    handleSelect = (eventKey) => {
        this.setState(prevState => {
            return (
                {
                    ...prevState,
                    key: eventKey
                }
            )});
        if (eventKey === 'citySearch') {
            if (this.props.searchCity && this.props.searchCity !== '') {
                this.props.history.push(`/search/${eventKey}/${this.props.searchCity}`)
            } else {
                this.props.history.push(`/search/${eventKey}`)
            }
        } else if (eventKey === 'placeSearch') {
            if (this.props.searchPlace && this.props.searchPlace !== '') {
                this.props.history.push(`/search/${eventKey}/${this.props.searchPlace}`)
            } else {
                this.props.history.push(`/search/${eventKey}`)
            }
        }
    };

    onCityInputChange = (event) => {
        this.props.updateSearchCity(event.target.value);
        this.props.updateAutofillCities(event.target.value)
    };

    onPlaceInputChange = (event) => {
        this.props.updateSearchPlace(event.target.value);
        this.props.updateAutofillPlaces(event.target.value)
    };

    onCitySelect = (cityName) => {
        this.props.updateSearchCity(cityName);
        this.props.updateAutofillCities('')
    };

    onPlaceSelect = (placeName) => {
        this.props.updateSearchPlace(placeName);
        this.props.updateAutofillPlaces('')
    };

    citySearch = (event) => {
        event.preventDefault();
        if (this.props.searchCity && this.props.searchCity !== '') {
            this.props.history.push(`/search/citySearch/${this.props.searchCity}`);
            this.searchForCity(this.props.searchCity)
        } else {
            this.props.clearCityResults();
            this.props.history.push(`/search/citySearch`)
        }
    };

    placeSearch = (event) => {
        event.preventDefault();
        if (this.props.searchPlace && this.props.searchPlace !== '') {
            this.props.history.push(`/search/placeSearch/${this.props.searchPlace}`);
            this.searchForPlace(this.props.searchPlace)
        } else {
            this.props.clearPlaceResults();
            this.props.history.push(`/search/placeSearch`)
        }
    };

    searchForCity = (city) => {
        this.props.updateAutofillCities('');
        if (city && city !== '') {
            this.props.executeCitySearch(city)
        } else {
            this.props.clearCityResults()
        }
    };

    searchForPlace = (city) => {
        this.props.updateAutofillPlaces('');
        if (city && city !== '') {
            this.props.executePlaceSearch(city)
        } else {
            this.props.clearPlaceResults()
        }
    };

    render() {

        return(
            <div className="container">
                <div className="row mt-2">
                    <Nav variant="tabs" defaultActiveKey={this.state.key}
                         onSelect={this.handleSelect}>
                        <Nav.Item>
                            <Nav.Link eventKey="citySearch">
                                City
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="placeSearch">
                                Place
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                {this.state.key === "citySearch" &&
                 <CitySearchComponent
                     search={this.citySearch}
                     searchCity={this.props.searchCity}
                     onInputChange={this.onCityInputChange}
                     autofillCities={this.props.autofillCities}
                     searchResults={this.props.citySearchResults}
                     userCities={this.props.userCities}
                     userDetails={this.props.userDetails}
                     addCity={this.props.addCity}
                     onSelect={this.onCitySelect}
                 />
                }
                {this.state.key === "placeSearch" &&
                 <PlaceSearchComponent
                     search={this.placeSearch}
                     searchPlace={this.props.searchPlace}
                     onInputChange={this.onPlaceInputChange}
                     autofillPlaces={this.props.autofillPlaces}
                     searchResults={this.props.placeSearchResults}
                     userCities={this.props.userCities}
                     userPlaces={this.props.userPlaces}
                     userDetails={this.props.userDetails}
                     addPlace={this.props.addPlace}
                     onSelect={this.onPlaceSelect}
                     selectedCityId={this.state.selectedCityId}
                     handleSelectedCityChange={this.handleSelectedCityChange}
                 />
                }
            </div>
        )
    }

}

const stateToPropertyMapper = (state) => ({
    userDetails: state.userReducer.userDetails,
    autofillCities: state.searchReducer.autofillCities,
    searchCity: state.searchReducer.searchCity,
    citySearchResults: state.searchReducer.citySearchResults,
    userCities: state.cityReducer.userCities,
    autofillPlaces: state.searchReducer.autofillPlaces,
    searchPlace: state.searchReducer.searchPlace,
    placeSearchResults: state.searchReducer.placeSearchResults,
    userPlaces: state.placeReducer.userPlaces
});

const propertyToDispatchMapper = (dispatch) => ({
    fetchCitiesForUser: (uid) => fetchCitiesForUser(dispatch, uid),
    fetchPlacesForUser: (uid) => fetchPlacesForUser(dispatch, uid),
    updateAutofillCities: (cityInput) => updateAutofillCities(dispatch, cityInput),
    updateSearchCity: (searchCity) => updateSearchCity(dispatch, searchCity),
    executeCitySearch: (city) => executeCitySearch(dispatch, city),
    addCity: (uid, city) => addCity(dispatch, uid, city),
    clearCityResults: () => clearCityResults(dispatch),
    updateAutofillPlaces: (placeInput) => updateAutofillPlaces(dispatch, placeInput),
    updateSearchPlace: (searchPlace) => updateSearchPlace(dispatch, searchPlace),
    executePlaceSearch: (place) => executePlaceSearch(dispatch, place),
    addPlace: (uid, cid, place) => addPlace(dispatch, uid, cid, place),
    clearPlaceResults: () => clearPlaceResults(dispatch),
});


export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(SearchComponent)
