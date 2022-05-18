const request = require('request')
const chalk = require('chalk')

const fetchWeatherInfo = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=988c433b59b041b2d85b69678b074d36&query=' + latitude + ',' + longitude;
    request ({
        url,
        json: true
    }, 
    (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Unable to find Location details', undefined)
        } else {
            callback(undefined, body)
        }
    })

    // request({ url: url }, (error, response) => {
    //     const data = JSON.parse(response.body)
    //     console.log(data.current)
    // })
}

module.exports = fetchWeatherInfo