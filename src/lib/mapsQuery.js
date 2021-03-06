const req = require('request');
const creds = require("./mapsCred.json");
let dist = 0; //in km
let duration = 0; // in hr


class MapsQuery {
    constructor() {
        this.creds = require('./mapsCred.json');
    }

    createAPIrequestURL(origin, destination, transportMode) {
        let urlOrigin = encodeURIComponent(origin).replace('%20', '+');
        let urlDestination = encodeURIComponent(destination).replace('%20', '+');
        console.log(creds.googleMapsKey);
        let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${urlOrigin}&destination=${urlDestination}&alternative=true&mode=${transportMode}&units=metric&key=${this.creds.googleMapsKey}`;
        return url;
    }

    async getQueryResults(origin, destination, timeframe){
    let res = [];
    let walkingUrl = this.createAPIrequestURL(origin, destination, "walking");
    let bikingUrl = this.createAPIrequestURL(origin, destination, "bicycling");
    let transitUrl = this.createAPIrequestURL(origin, destination, "transit");
    let drivingUrl = this.createAPIrequestURL(origin, destination, "driving");

    let APIReqArr = [];

    let walkingProm = new Promise( (resolve, reject) => {
        req(walkingUrl, (err, res, body) => {
            try {
                let data = JSON.parse(body);
                data.type = "walking";
                console.log(data.routes[0].overview_polyline);
                dist = data.routes[0].legs[0].distance.value/1000;
                duration = data.routes[0].legs[0].duration.value/3600;
                resolve(data);
            } catch (error) {
                reject(error);
            }
        })
    })

    let bikingProm = new Promise( (resolve, reject) => {
        req(bikingUrl, (err, res, body) => {
            try {
                let data = JSON.parse(body);
                data.type = "bicycling";
                console.log(data.routes[0].overview_polyline);
                dist = data.routes[0].legs[0].distance.value/1000;
                duration = data.routes[0].legs[0].duration.value/3600;
                resolve(data);
            } catch (error) {
                reject(error);
            }
        })
    })

    let transitProm = new Promise( (resolve, reject) => {
        req(transitUrl, (err, res, body) => {
            try {
                let data = JSON.parse(body);
                console.log(data.routes[0].overview_polyline);
                data.type = "transit";
                dist = data.routes[0].legs[0].distance.value/1000;
                duration = data.routes[0].legs[0].duration.value/3600;
                resolve(data);
            } catch (error) {
                reject(error);
            }
        })
    })

    let drivingProm = new Promise( (resolve, reject) => {
        req(drivingUrl, (err, res, body) => {
            try {
                let data = JSON.parse(body);
                data.type = "driving";
                console.log(data.routes[0].overview_polyline);
                dist = data.routes[0].legs[0].distance.value/1000;
                duration = data.routes[0].legs[0].duration.value/3600;
                resolve(data);
            } catch (error) {
                reject(error);
            }
        })
    })

    return Promise.all([drivingProm, transitProm, bikingProm, walkingProm]).then((values => {
        console.log(values);
        return values;
        }))
    }
}

module.exports = MapsQuery;