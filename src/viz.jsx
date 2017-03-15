const React = window.React;
const { Map, TileLayer } = window.ReactLeaflet;

class NYCMap extends React.Component {
    constructor() {
        super();
        this.state = {
            zoom: 13,
            bounds: [[40.6794268,-73.92989109999999], [40.789747, -74.075979]]
        };
    }

    render() {
        return (
            <Map
                 zoom={this.state.zoom}
                 bounds={this.state.bounds}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
            </Map>
        );
    }
}

window.ReactDOM.render(<NYCMap />, document.getElementById('visualization'));