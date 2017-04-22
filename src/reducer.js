/*
The Redux reducer that handles generating the next state based on the previous state.
*/

const core = require('../src/core.js');
const moment = require('moment');

export function reducer(state, action) {
    switch (action.type) {
        case 'GET_STATIONS_ON_DATE_DISPLAY':
            return {
                'display': 'stations_on_date',
                'stations': core.get_stations_on_date(action.date),
                'trips': null,
                'tripsets': null
            };
    }
    return state;
}