
export const fetchAutofillPlaces = (placeSearchField) => {
    return fetch(`https://api.locationiq.com/v1/autocomplete.php?key=pk.2b6c39d5db0774c80f1a06129ec749a9&q=${placeSearchField}&dedupe=1`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
};

export const fetchPlaces = (place) => {
    return fetch(`https://us1.locationiq.com/v1/search.php?key=pk.2b6c39d5db0774c80f1a06129ec749a9&q=${place}&format=json&limit=25&namedetails=1`)
        .then(response => {
            return response.json()
        })
};

export const fetchPlace = (geonameID) => {
    return fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.2b6c39d5db0774c80f1a06129ec749a9&lat=-37.870662&lon=144.9803321&format=json`)
        .then(response => {
            return response.json()
        })
};


export default { fetchAutofillPlaces, fetchPlace }

