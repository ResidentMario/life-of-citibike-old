const http = require('http');

export function step_back(previous_ticks, min_ticks=0) {
    return previous_ticks === min_ticks ? previous_ticks : previous_ticks - 1;
}

export function step_forward(next_ticks, max_ticks=100) {
    return next_ticks === max_ticks ? next_ticks : next_ticks + 1;
}

export function get_bike_inbounds(id, callback) {
    const uri = 'http://www.residentmar.io/citibike-api/bike-inbounds/id/' + String(id);
    const req = http.get(uri, function(response) {
        response.on('end', () => {
            callback(JSON.parse(response));
        });
    });
    req.end();
}

export function get_bike_outbounds(id, callback) {
    const uri = 'http://www.residentmar.io/citibike-api/bike-outbounds/id/' + String(id);
    const req = http.get(uri, function(response) {
        response.on('end', () => {
            callback(JSON.parse(response));
        });
    });
    req.end();
}

export function get_incoming_trips(id, callback) {
    const uri = 'http://www.residentmar.io/citibike-api/incoming-trips/id/' + String(id);
    const req = http.get(uri, function(response) {
        response.on('end', () => {
            callback(JSON.parse(response));
        });
    });
    req.end();
}

export function get_outgoing_trips(id, callback) {
    const uri = 'http://www.residentmar.io/citibike-api/outgoing-trips/id/' + String(id);
    const req = http.get(uri, function(response) {
        response.on('end', () => {
            callback(JSON.parse(response));
        });
    });
    req.end();
}
