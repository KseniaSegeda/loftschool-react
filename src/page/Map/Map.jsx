import React, {Component} from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
mapboxgl.accessToken = 'pk.eyJ1IjoiZHJhZ2luIiwiYSI6ImNraXpob3drMDFvNmcyem56NDI1c2prMTIifQ.zfgJa232mWsv5DD2AQmd_w';


class Map extends Component {
    constructor(props) {
        super(props);
        this.map = null;
        this.mapContainer = React.createRef();
    }

    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [37.61513, 55.7513461], // moscow
            zoom: 11,
        });
    }

    render(){
        return <div data-testid="map" className="map-container" ref={this.mapContainer} />;
    }
}


export default Map;
