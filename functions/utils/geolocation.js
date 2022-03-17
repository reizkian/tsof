const axios = require("axios");
const {googleMapApiKey} = require("./admin")

exports.getAddressGeoLocation = function(stringAddress){
    // 1. target URL for GET request to google map
    const geoCodingRequestURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${stringAddress}&key=${googleMapApiKey}`;
    // 2. execute GET REQUEST to geoCodingRequestURL
    return axios.get(geoCodingRequestURL, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((gmap_respond)=>{
        // 3. get latitude and longitude object
        let addressGeoLocation = gmap_respond.data.results[0].geometry.location;
        console.log(`success GET address geo location [${addressGeoLocation.lat},${addressGeoLocation.lng}]`)
        return addressGeoLocation
    })
    .catch((err) => {
        console.log("failed GET address geo location")
        console.log(err)
        return null
    })
}