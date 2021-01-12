import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";

const Map = () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZHJhZ2luIiwiYSI6ImNraXpob3drMDFvNmcyem56NDI1c2prMTIifQ.zfgJa232mWsv5DD2AQmd_w';
    const mapContainer = useRef(null);
    useEffect(() => {
        const myMap = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [37.61513, 55.7513461], // moscow
            zoom: 11,
        });
        return () => myMap.remove();
    }, []);
    return <div data-testid="map" className="map-container" ref={mapContainer} />;
}


export default Map;
