const request = require('request')

const forecast = (lat, long, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=bcb689a3331844079a43f36f8614d802&query='+ lat + ',' + long

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find your location. Try again!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. The current temperature is ' + body.current.temperature + '. And real feel is ' + body.current.feelslike)
        }

    })

}

module.exports = forecast