import React, {useEffect, useRef} from "react";
import OpenOrder from "../../components/OpenOrder/OpenOrder"
import mapboxgl from "mapbox-gl";
import "./Map.css";
import {getRoute} from "../../redux/route/reducer"
import {connect} from "react-redux";

const Map = (props) => {
    const {addresses, draw} = props;
    console.log(props)
    mapboxgl.accessToken = 'pk.eyJ1IjoiZHJhZ2luIiwiYSI6ImN' +
        'raXpob3drMDFvNmcyem56NDI1c2prMTIifQ.zfgJa232mWsv5DD2AQmd_w';
    const mapContainer = useRef(null);
    useEffect(() => {
        const myMap = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [30.302499027775248, 59.92261297636499],
            zoom: 11,
        });
        if(draw.drawRoute.length && !draw.isLoading){
            const coordinates = draw.drawRoute;
            myMap.on('styledata', function() {drawRoute(myMap, coordinates)});
        }
        return () => myMap.remove();
    }, [draw]);
    return <>
        <OpenOrder listAddress={addresses} />
        <div data-testid="map" className="map-container" ref={mapContainer} />
    </>;
}

export const drawRoute = (map, coordinates) => {
    map.flyTo({
        center: coordinates[0],
        zoom: 15
    });

    map.addLayer({
        id: "route",
        type: "line",
        source: {
            type: "geojson",
            data: {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates
                }
            }
        },
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "blue",
            "line-width": 8
        }
    });
};

export default connect(
    getRoute,
    {}
)(Map);
