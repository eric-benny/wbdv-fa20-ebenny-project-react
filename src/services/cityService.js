
const fetchAutofillCities = (citySearchField) => {
    return fetch(`http://api.geonames.org/searchJSON?name_startsWith=${citySearchField}&maxRows=20&orderby=population&username=bennye`)
        .then(response => {
            return response.json()
        })
};

const fetchCities = (city) => {
    return fetch(`http://api.geonames.org/searchJSON?name=${city}&maxRows=100&orderby=population&username=bennye`)
        .then(response => {
            return response.json()
        })
};

const fetchCity = (geonameID) => {
    return fetch(`http://api.geonames.org/getJSON?geonameId=${geonameID}&username=bennye&style=json`)
        .then(response => {
            return response.json()
        })
};


export default { fetchAutofillCities, fetchCities, fetchCity }
