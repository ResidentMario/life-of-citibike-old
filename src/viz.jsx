// Globals imported from the window.
const React = window.React;
const { Map, TileLayer, Marker } = window.ReactLeaflet;
const _ = window._;
// const d3 = window.d3;


// Initialize Redux state.
const makeStore = require('./store.js').makeStore;
let store = makeStore();

// const inset_graph = require("./inset_graph");

/* macro object containing all the state */
class Visualization extends React.Component {
    constructor() {
        super();
        this.state = {
            zoom: 13,
            bounds: [[40.6794268, -73.92989109999999], [40.789747, -74.075979]],
            scroll_ticks: 0,
            max_scroll_ticks: 100,
            screen_state: {intro: true}
        };

        // binding is necessary to make "this" work
        this.handleScroll = this.handleScroll.bind(this);
    }

    /* the main event loop (via a scroll event listener) for the visualization */
    handleScroll(e) {
        if (e.deltaY > 0) {
            if (this.state.scroll_ticks < this.state.max_scroll_ticks) {
                this.state.scroll_ticks += 1;
                // re-render.
                this.setState({newForm: true});
            }
        } else {
            if (this.state.scroll_ticks > 0) {
                this.state.scroll_ticks--;
                // re-render.
                this.setState({newForm: true});
            }
        }
    }

    /* change the current screen state; lower-level components detect this change and use it to update */
    setScreenState(percent) {
        // Case 1: we have the introductory text on the screen and are transitioning by painting it out.
        if ((this.props.percent > 5) && this.state.introTextOnScreen) {
            this.state.introTextOnScreen = false;
        }
        // Case 2: we do not have the introductory text on the screen and are transitioning by painting it in.
        else if ((this.props.percent <= 5) && !this.state.introTextOnScreen) {
            this.state.introTextOnScreen = true;
        }
        // Case 3: we do not have the station display on the screen and are transitioning by painting the display.
        else if ((5 < this.props.percent < 10) && !this.state.stationHistoryOnScreen) {
            this.state.stationHistoryOnScreen = true;
        }
        // Case 4: we have the introductory text on the screen and are transitioning by painting it out.
        else if ((10 < this.props.percent < 15) && !this.state.stationHistoryOnScreen) {
            this.state.stationHistoryOnScreen = false;
        }
    }

    // TODO: Write a screen state differ, which both the map and overlay will inherit.
    getScreenStateChange(prev_state, curr_state) {
        // cf. http://stackoverflow.com/questions/31683075/how-to-do-a-deep-comparison-between-2-objects-with-lodash
        return;
    }

    render() {
        let percent = this.state.scroll_ticks / this.state.max_scroll_ticks * 100;

        // Visualization elements are a combination of (1) leaflet elements painted onto the map via react-leaflet
        // (positioned via latitude-longitude pairs) and (2) overlay elements superimposed on the viz (via absolute
        // positioning).
        //
        // These elements are two distinct components, but make up the "whole" of the display. Since we want them to
        // move in tandem, we handle the "book-keeping" of keeping them in sync with one another here.
        //
        // Whenever the user moves the mouse wheel a tick, the visualization basically moves forward one tick. But
        // we're actually doing something a little more subtle; we have elements that fade in and fade out of the
        // screen as the visualization continues. In simple cases, this fading in and out behavior is all the
        // element does.
        //
        // This is done using generic "show" and "hide" CSS mixin transition classes. We make judicious use of
        // shouldComponentUpdate to ensure that for ticks when the element isn't actually doing anything we don't
        // waste time repainting it either.

        return (
            <div className="visualization-content-frame" onWheel={this.handleScroll}>
                {[
                    <NYCMap
                        zoom={this.state.zoom}
                        bounds={this.state.bounds}
                        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                        url='http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
                        subdomains='abcd'
                        key={1}
                        percent={percent}
                    >
                    </NYCMap>,
                    <Overlay key={2}
                             percent={percent}/>,
                    <Scrollbar percent={percent} key={3}/>
                ]}
            </div>
        );
    }
}

/* base map, as well as the map components which get added and removed as the viz runs */
class NYCMap extends React.Component {
    render() {
        let tiles = <TileLayer
            attribution={this.props.attribution}
            url={this.props.url}
            subdomains={this.props.subdomains}
            key={1}
        />;
        let map_elements = [tiles];

        return <Map
                zoom={this.props.zoom}
                bounds={this.props.bounds}
                scrollWheelZoom={false}>
            {map_elements}
        </Map>
    }
}

/* display element superimposed on the map that is vertically and horizontally anchored in the center of the screen */
class Overlay extends React.Component {
    constructor() {
        super();
        this.state = {introTextOnScreen: false, stationHistoryOnScreen: false}
    }

    render() {
        // NB: transitions are handled as CSS animations.

        // Case 1: we have the introductory text on the screen and are transitioning by painting it out.
        if ((this.props.percent > 5) && this.state.introTextOnScreen) {
            this.state.introTextOnScreen = false;
            return <div className="overlay"><IntroScreen fadeIn={false} fadeOut={true}/></div>
        }
        // Case 2: we do not have the introductory text on the screen and are transitioning by painting it in.
        else if ((this.props.percent <= 5) && !this.state.introTextOnScreen) {
            this.state.introTextOnScreen = true;
            return <div className="overlay"><IntroScreen fadeIn={true} fadeOut={false}/></div>
        }
        // Case 3: we do not have the station display on the screen and are transitioning by painting the display.
        else if ((5 < this.props.percent < 10) && !this.state.stationHistoryOnScreen) {
            this.state.stationHistoryOnScreen = true;
            return <div className="overlay"></div>
        }
    }

    // Only redraw if we need to transition. These are all of the same cases as the above.
    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.percent <= 5 && !this.state.introTextOnScreen) ||
                (nextProps.percent > 5 && this.state.introTextOnScreen) ||
                ((5 < this.props.percent < 10) && !this.state.stationHistoryOnScreen));
    }
}

class IntroScreen extends React.Component {
    render() {
        let transition_class = this.props.fadeIn ? "show" : "hide";
        let class_name = "intro-screen-frame " + transition_class;

        return <div className={class_name}>
            <div className="intro-screen-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse est purus, rhoncus id nulla vel, rhoncus ullamcorper risus. Aenean nulla arcu, dignissim vel metus in, luctus convallis odio. Etiam eget ipsum nec lacus ultrices efficitur quis non nibh. Phasellus ullamcorper risus et ex aliquam mollis. Ut fringilla a tellus at condimentum. In ut fringilla elit, ac placerat ipsum. Aliquam congue ac mauris non vehicula. Aenean vitae nulla in elit semper venenatis. Duis auctor eros ante. Curabitur cursus odio risus, et euismod elit fermentum quis. Donec fermentum odio libero, eget vulputate risus accumsan eu. Aliquam tristique nibh fermentum ligula tempor porttitor. Pellentesque convallis tempor lectus, in euismod nunc eleifend ac. Duis faucibus ultricies est nec ornare. Nam pulvinar ultricies lorem, hendrerit varius urna aliquam vitae.
            </div>

            <div className="intro-screen-continue-text">
                ↓ scroll down to continue ↓
            </div>
        </div>
    }
}

class Scrollbar extends React.Component {
    render() {
        return (<div className="scroll-bar" style={{width: this.props.percent + "%"}}></div>);
    }
}

// class InsetGraph extends React.Component {
//
//     render() {
//         console.log("HELLO WORLD");
        {/*return (*/}
            {/*<div className="inset-graph"></div>*/}
        {/*);*/}
//     }
//
//     componentDidMount() {
//         console.log("HELLO WORLD 2");
//         let el = ReactDOM.findDOMNode();
//         inset_graph.create(el, {width: 200, height: 200}, null)
//     }
//
// }


window.ReactDOM.render(<Visualization />, document.getElementById('visualization-container'));
