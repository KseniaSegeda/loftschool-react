import React, {useEffect, useRef, useState} from "react";
import OpenOrder from "../../components/OpenOrder/OpenOrder"
import mapboxgl from "mapbox-gl";
import "./Map.css";
import {getRoute, resetRouter} from "../../redux/route"
import {connect} from "react-redux";
import PaymentsOrder from "../../components/PaymentsOrder/PaymentsOrder";
import {pendingGetCard} from "../../redux/payments";

const Map = (props) => {
    const {addresses, draw, isCard, pendingGetCard, resetRouter} = props;
    const [map, setMap] = useState(null)

    mapboxgl.accessToken = 'pk.eyJ1IjoiZHJhZ2luIiwiYSI6ImN' +
        'raXpob3drMDFvNmcyem56NDI1c2prMTIifQ.zfgJa232mWsv5DD2AQmd_w';
    const mapContainer = useRef(null);
    useEffect(() => {
        setMap(new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [30.302499027775248, 59.92261297636499],
            zoom: 11,
        }));
        pendingGetCard();
    }, [pendingGetCard]);

    useEffect(() => {
        if (draw.drawRoute.length && !draw.isLoading && map && map.isStyleLoaded()) {
            resetRouter()
            const coordinates = draw.drawRoute;
            drawRoute(map, coordinates);
        }
    }, [map, draw.drawRoute, draw.isLoading, isCard, resetRouter])

    return <>
        {isCard ? <OpenOrder listAddress={addresses}/> : <PaymentsOrder/> }
        <div data-testid="map" className="map-container" ref={mapContainer}/>
    </>;
}

export const drawRoute = (map, coordinates) => {
    map.flyTo({
        center: coordinates[0],
        zoom: 15
    });
    if (map.getLayer("route")) {
        map.removeLayer("route");
    }
    if (map.getSource("route")) {
        map.removeSource("route");
    }
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
    {pendingGetCard, resetRouter}
)(Map);
