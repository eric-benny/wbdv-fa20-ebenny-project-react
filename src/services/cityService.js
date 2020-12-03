import {fetchCitiesForUser} from "./userCityService";

export const fetchAutofillCities = (citySearchField) => {
    return fetch(`http://api.geonames.org/searchJSON?name_startsWith=${citySearchField}&maxRows=20&orderby=population&username=bennye`)
        .then(response => {
            return response.json()
        })
};

export const fetchCities = (city) => {
    return fetch(`http://api.geonames.org/searchJSON?name=${city}&maxRows=100&orderby=population&username=bennye`)
        .then(response => {
            return response.json()
        })
};

export const fetchCity = (geonameID) => {
    return fetch(`http://api.geonames.org/get?geonameId=${geonameID}&username=bennye`)
        .then(response => {
            return response.json()
        })
};


export default { fetchAutofillCities, fetchCities, fetchCity }
