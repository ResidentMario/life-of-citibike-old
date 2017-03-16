(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const React = window.React;
const { Map, TileLayer } = window.ReactLeaflet;

/* macro object containing all the state */
class Visualization extends React.Component {
    constructor() {
        super();
        this.state = {
            zoom: 13,
            bounds: [[40.6794268, -73.92989109999999], [40.789747, -74.075979]]
        };
    }

    render() {
        return React.createElement(NYCMap, {
            zoom: this.state.zoom,
            bounds: this.state.bounds,
            attribution: '\xA9 <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> \xA9 <a href="http://cartodb.com/attributions">CartoDB</a>',
            url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            subdomains: 'abcd' });
    }
}

/* base map */
class NYCMap extends React.Component {
    render() {
        return React.createElement(
            Map,
            {
                zoom: this.props.zoom,
                bounds: this.props.bounds },
            React.createElement(TileLayer, {
                attribution: this.props.attribution,
                url: this.props.url,
                subdomains: this.props.subdomains
            })
        );
    }
}

/* display element superimposed on the map that is vertically and horizontally anchored in the center of the screen */
class Overlay extends React.Component {
    render() {
        return React.createElement(
            'div',
            { className: 'overlay' },
            React.createElement(IntroScreen, null)
        );
    }
}

class IntroScreen extends React.Component {
    render() {
        return React.createElement(
            'div',
            { className: 'intro-screen-frame' },
            React.createElement(
                'div',
                { className: 'intro-screen-content' },
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse est purus, rhoncus id nulla vel, rhoncus ullamcorper risus. Aenean nulla arcu, dignissim vel metus in, luctus convallis odio. Etiam eget ipsum nec lacus ultrices efficitur quis non nibh. Phasellus ullamcorper risus et ex aliquam mollis. Ut fringilla a tellus at condimentum. In ut fringilla elit, ac placerat ipsum. Aliquam congue ac mauris non vehicula. Aenean vitae nulla in elit semper venenatis. Duis auctor eros ante. Curabitur cursus odio risus, et euismod elit fermentum quis. Donec fermentum odio libero, eget vulputate risus accumsan eu. Aliquam tristique nibh fermentum ligula tempor porttitor. Pellentesque convallis tempor lectus, in euismod nunc eleifend ac. Duis faucibus ultricies est nec ornare. Nam pulvinar ultricies lorem, hendrerit varius urna aliquam vitae.'
            ),
            React.createElement(
                'div',
                { className: 'intro-screen-continue-text' },
                '\u2193 scroll down to continue \u2193'
            )
        );
    }
}

window.ReactDOM.render(React.createElement(Visualization, null), document.getElementById('visualization'));
window.ReactDOM.render(React.createElement(Overlay, null), document.getElementById('overlay'));

},{}]},{},[1]);
