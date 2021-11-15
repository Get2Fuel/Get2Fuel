import React, { useState } from "react";
import ReactMapGL, { GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// import mapboxgl from "!mapbox-gl";

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.

// eslint-disable-next-line import/no-webpack-loader-syntax
// mapboxgl.workerClass =
//   require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const geolocateControlStyle = {
  right: 10,
  top: 10,
};

function Map() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 45,
    longitude: 11,
    zoom: 12,
  });

  const [pumps, setPumps] = useState([]);

  const fetchPumps = async (nextViewport) => {
    const rawResponse = await fetch(
      `http://93.45.42.51:61234/geolocate/${nextViewport.latitude}/${nextViewport.longitude}/gasoline/any/`
    );
    const response = await rawResponse.json();
    setPumps(response.pumps);
  };

  return (
    <ReactMapGL
      {...viewport}
      minZoom={11}
      mapboxApiAccessToken={
        "pk.eyJ1IjoibG9yZW56b2FuZHJlb3R0aSIsImEiOiJja3Q0ZndxYmoweHVrMzByMWdrNHd5Zno1In0.JXPUPxIQ6yLbD3HBa_pHvQ"
      }
      mapStyle={"mapbox://styles/mapbox/dark-v10"}
      onViewportChange={(nextViewport) => {
        setViewport(nextViewport);
        fetchPumps(nextViewport);
      }}
    >
      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        auto
      />
      {pumps.map((pump, id) => (
        <Marker latitude={+pump.lat} longitude={+pump.lon} key={id}>
          <a
            style={{
              backgroundColor: "white",
              padding: "4px",
              borderRadius: "4px",
              textDecoration: "none",
              color: "black",
            }}
            href={
              "https://www.google.com/maps/search/?api=1&query=" +
              pump.lat +
              "," +
              pump.lon
            }
            target="_blank"
            rel="noreferrer"
            className={"poi"}
          >
            {pump.fuels.gasoline.self}
          </a>
        </Marker>
      ))}
    </ReactMapGL>
  );
}

export default Map;
