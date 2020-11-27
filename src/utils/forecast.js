const request = require('request')

const forecast = (lat, long, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=ec2a50ca7cbf3abb8ba03f946809ecf0&query='+ lat + ','+ long +'&units=m'
  request({ url, json: true }, (error,{body}) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if( body.error) {
      callback('unable to find location', undefined)
    } else {
      callback(undefined, body.current.weather_descriptions[0]+' It is currenty '+body.current.temperature+' degrees out and feelslike '+body.current.feelslike+' degrees')
    }
  })
}

module.exports = forecast