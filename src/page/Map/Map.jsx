import React, {useEffect, useRef, useState} from "react";
import OpenOrder from "../../components/OpenOrder/OpenOrder"
import mapboxgl from "mapbox-gl";
import "./Map.css";
import {getRoute} from "../../redux/route"
import {connect} from "react-redux";
import PaymentsOrder from "../../components/PaymentsOrder/PaymentsOrder";

const Map = (props) => {
    const {addresses, draw, isCard} = props;

    const [modal, setModal] = useState('payments');

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
        !isCard? setModal('payments') : setModal('order');

        if(draw.drawRoute.length && !draw.isLoading){
            const coordinates = draw.drawRoute;
            myMap.on('styledata', function() {drawRoute(myMap, coordinates)});
        }
        // return () => myMap.remove();
    }, [draw.drawRoute, draw.isLoading, isCard]);
    return <>
        {modal=== 'payments' ?  <PaymentsOrder/> : null}
        {modal=== 'order' ? <OpenOrder listAddress={addresses} />: null}
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
