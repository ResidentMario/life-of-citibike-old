"use strict";

// const im = require('immutable');
const expect = require('chai').expect;
// const sinon = require('sinon');
// const PassThrough = require('stream').PassThrough;

const core = require('../src/core.js');

describe('stepping logic', () => {
    describe('step_forward', () => {
        it('increases the number of ticks by one when it is possible to advance', () => {
            let previous_ticks = 0;
            let next_ticks = core.step_forward(previous_ticks);
            expect(next_ticks).to.equal(1);
        });

        it('does nothing when it is not possible to advance', () => {
            let previous_ticks = 100;
            let next_ticks = core.step_forward(previous_ticks);
            expect(next_ticks).to.equal(100);
        });
    });

    describe('step_back', () => {
        it('decreases the number of ticks by one when it is possible to retreat', () => {
            let previous_ticks = 1;
            let next_ticks = core.step_back(previous_ticks);
            expect(next_ticks).to.equal(0);
        });

        it('does nothing when it is not possible to retreat', () => {
            let previous_ticks = 0;
            let next_ticks = core.step_back(previous_ticks);
            expect(next_ticks).to.equal(0);
        })
    })

});
