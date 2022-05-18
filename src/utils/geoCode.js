const request = require('request')
const chalk = require('chalk')

const geoCode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoiYW9taW5lLWRhaWtpIiwiYSI6ImNsMmJpZDlpZDBkbXIzam5ybXN5anAwb24ifQ.Lk26oDkwf2y86H5mUGuAWg&limit=1'
    request({
        url,
        json: true
    }, (error, { body } = {} ) => {
        if (error) {
            callback('Unable to connect to the Geo service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find Location. Try another search.', undefined)
        } else {
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]
            callback(undefined, {
                latitude,
                longitude
            })
        }
    })
}

module.exports = geoCode