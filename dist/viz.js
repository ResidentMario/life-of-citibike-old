(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const React = window.React;
const { Map, TileLayer } = window.ReactLeaflet;
const d3 = window.d3;

// const Line = require('rc-progress').Line;

/* macro object containing all the state */
class Visualization extends React.Component {
    constructor() {
        super();
        this.state = {
            zoom: 13,
            bounds: [[40.6794268, -73.92989109999999], [40.789747, -74.075979]],
            scroll_ticks: 0,
            max_scroll_ticks: 100,
            screen_state: { intro: true }
        };

        // binding is necessary to make "this" work
        this.handleScroll = this.handleScroll.bind(this);
    }

    /* the main event loop for the visualization */
    handleScroll(e) {
        if (e.deltaY > 0) {
            if (this.state.scroll_ticks < this.state.max_scroll_ticks) {
                this.state.scroll_ticks += 1;
                // re-render.
                this.setState({ newForm: true });
            }
        } else {
            if (this.state.scroll_ticks > 0) {
                this.state.scroll_ticks--;
                // re-render.
                this.setState({ newForm: true });
            }
        }
    }

    render() {
        let percent = this.state.scroll_ticks / this.state.max_scroll_ticks * 100;

        return React.createElement(
            'div',
            { className: 'visualization-content-frame', onWheel: this.handleScroll },
            [React.createElement(NYCMap, {
                zoom: this.state.zoom,
                bounds: this.state.bounds,
                attribution: '\xA9 <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> \xA9 <a href="http://cartodb.com/attributions">CartoDB</a>',
                url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                subdomains: 'abcd',
                key: 1 }), React.createElement(Overlay, { key: 2,
                percent: percent }), React.createElement(Scrollbar, { percent: percent, key: 3 })]
        );
    }
}

/* base map */
class NYCMap extends React.Component {
    render() {
        return React.createElement(
            Map,
            {
                zoom: this.props.zoom,
                bounds: this.props.bounds,
                scrollWheelZoom: false },
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
    constructor() {
        super();
        this.state = { introTextOnScreen: false };
    }

    render() {
        if (this.state.introTextOnScreen) {
            this.state.introTextOnScreen = false;
            return React.createElement(
                'div',
                { className: 'overlay' },
                React.createElement(IntroScreen, { fadeIn: false, fadeOut: true })
            );
        } else {
            this.state.introTextOnScreen = true;
            return React.createElement(
                'div',
                { className: 'overlay' },
                React.createElement(IntroScreen, { fadeIn: true, fadeOut: false })
            );
        }
    }

    /* only redraw if we need to transition */
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.percent <= 5 && this.state.introTextOnScreen == false || nextProps.percent > 5 && this.state.introTextOnScreen == true;
    }
}

class IntroScreen extends React.Component {
    render() {
        let transition_class = this.props.fadeIn ? "show" : "hide";
        let class_name = "intro-screen-frame " + transition_class;

        return React.createElement(
            'div',
            { className: class_name },
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

class Scrollbar extends React.Component {
    render() {
        return React.createElement('div', { className: 'scroll-bar', style: { width: this.props.percent + "%" } });
    }
}

window.ReactDOM.render(React.createElement(Visualization, null), document.getElementById('visualization-container'));

},{}]},{},[1]);
