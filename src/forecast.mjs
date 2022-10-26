import request from 'request';
const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=324cd6ccbfa1ceb6c9c7443ede51303e&query=' +  latitude + ',' + longitude + '&units=f'
    

request({ url: url, json: true }, (error, response) => {
    if (error) {
        callback('Unable to connect to location services!',undefined)
    } else if (response.body.current.length === 0) {
        callback('Unable to find location. Try another search.',undefined)
    } else {
        callback(undefined,{
         temperature : response.body.current.temperature,
         feelslike : response.body.current.feelslike
        
    })
}
})
}
export default forecast;