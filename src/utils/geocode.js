const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYm9iZ2FyaWNrIiwiYSI6ImNrYTJ2cTNwdDA4eDQzZnRiZHl3ZjNpcXEifQ.JPZsq9VIC8voE6Ml7DhLUg'

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services.', undefined)
        } else if (body.features.length === 0){
            callback('Unable to find location.  Find a another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode