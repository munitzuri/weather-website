const request = require('request')
//const Math = require ('Math')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/e0ab98f212979c3d4752ae773f16b5be/' + latitude + ',' + longitude+'?units=si'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' +  Math.round(body.currently.precipProbability*100) + '% chance of rain.')
        }
    })
}

module.exports = forecast