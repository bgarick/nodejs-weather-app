const request = require('request')

const forecast = (long, lat, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=c3fc1be35e4a807a0bde1b243e3e6227&query=" + lat + "," + long + "&units=f"
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services with long/lat data.', undefined)
        } else if (body.error){
            callback('Location does not exist. Find another search.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ".  It is currently " + body.current.temperature + " degrees out but it feels like " + body.current.feelslike + " degrees.")
        }
    })
}

module.exports = forecast
