(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const React = window.React;
const { Map, TileLayer } = window.ReactLeaflet;

class NYCMap extends React.Component {
    constructor() {
        super();
        this.state = {
            zoom: 13,
            bounds: [[40.6794268, -73.92989109999999], [40.789747, -74.075979]]
        };
    }

    render() {
        return React.createElement(
            Map,
            {
                zoom: this.state.zoom,
                bounds: this.state.bounds },
            React.createElement(TileLayer, {
                attribution: '\xA9 <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> \xA9 <a href="http://cartodb.com/attributions">CartoDB</a>',
                url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                subdomains: 'abcd'
            })
        );
    }
}

window.ReactDOM.render(React.createElement(NYCMap, null), document.getElementById('visualization'));

},{}]},{},[1]);
