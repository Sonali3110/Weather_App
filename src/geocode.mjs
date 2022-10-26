import request from 'request';

const geocode = (address,callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=c3932384094a53688e188cea8dfb1e66&query=1600%20' + encodeURIComponent(address) 
    

request({ url: url, json: true }, (error, response) => {
    if (error) {
        callback('Unable to connect to location services!',undefined)
    } else if (response.body.data.length === 0) {
        callback('Unable to find location. Try another search.',undefined)
    } else {
        callback(undefined,{
         latitude : response.body.data[0].latitude,
         longitude : response.body.data[0].longitude,
         location : response.body.data[0].name
        
    })
}
})
}
export default geocode;

               