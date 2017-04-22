"use strict";

const expect = require('chai').expect;
const moment = require('moment');

const core = require('../src/core.js');
const reducer = require('../src/reducer.js').reducer;

describe('reducer', () => {

    it('handles GET_STATIONS', () => {
        const initialState = core.INITIAL_STATE;
        const action = {type: 'GET_STATIONS_ON_DATE_DISPLAY', date: moment('20170101', 'YYYYMMDD')};
        const nextState = reducer(initialState, action);

        // expect(nextState).to.equal({
        //     'display': 'stations_on_date',
        //     'stations': core.get_stations_on_date(action.date),  // TODO: fix this.
        //     'trips': null,
        //     'tripsets': null
        // });
    });

});