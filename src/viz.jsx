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
            max_scroll_ticks: 100
        };

        // binding is necessary to make "this" work
        this.handleScroll = this.handleScroll.bind(this);
        this.setScreenState = this.setScreenState.bind(this);

        this.setScreenState();
    }

    /* the main event loop for the visualization */
    handleScroll(e) {
        if (e.deltaY > 0) {
            if (this.state.scroll_ticks < this.state.max_scroll_ticks) {
                this.state.scroll_ticks += 1;
                this.setState({newForm: true});
            }
        } else {
            if (this.state.scroll_ticks > 0) {
                this.state.scroll_ticks--;
                this.setState({newForm: true});
            }
        }
    }

    setScreenState() {
        let percent = this.state.scroll_ticks / this.state.max_scroll_ticks * 100;
        let s = this.state.screen_state = {};

        s.intro = (percent < 5);
    }


    render() {
        let percent = this.state.scroll_ticks / this.state.max_scroll_ticks * 100;

        return (
            <div className="visualization-content-frame" onWheel={this.handleScroll}>
                {[
                    <NYCMap
                        zoom={this.state.zoom}
                        bounds={this.state.bounds}
                        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                        url='http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
                        subdomains='abcd'
                        key={1}>
                    </NYCMap>,
                    <Overlay key={2}
                             percent={percent}
                             />,
                    <Scrollbar percent={percent} key={3}/>
                ]}
            </div>
        );
    }
}

/* base map */
class NYCMap extends React.Component {
    render() {
        return <Map
                zoom={this.props.zoom}
                bounds={this.props.bounds}
                scrollWheelZoom={false}>
                <TileLayer
                    attribution={this.props.attribution}
                    url={this.props.url}
                    subdomains={this.props.subdomains}
                />
        </Map>
    }
}

/* display element superimposed on the map that is vertically and horizontally anchored in the center of the screen */
class Overlay extends React.Component {
    constructor() {
        super();
        this.state = {introTextOnScreen: false}
    }

    render() {
        if (this.state.introTextOnScreen) {
            this.state.introTextOnScreen = false;
            return <div className="overlay"><IntroScreen fadeIn={false} fadeOut={true}/></div>
        }
        else {
            this.state.introTextOnScreen = true;
            return <div className="overlay"><IntroScreen fadeIn={true} fadeOut={false}/></div>
        }
    }

    /* only redraw if we need to transition */
    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.percent <= 5 && this.state.introTextOnScreen == false) ||
                (nextProps.percent > 5 && this.state.introTextOnScreen == true));
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


window.ReactDOM.render(<Visualization />, document.getElementById('visualization-container'));
