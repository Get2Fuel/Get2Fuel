import React, { useState } from "react";
import ReactMapGL, { GeolocateControl, Marker } from "react-map-gl";

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
      `http://192.168.1.73:3100/geolocate/${nextViewport.latitude}/${nextViewport.longitude}/gasoline/any/`
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
      {pumps.map((pump) => (
        <Marker latitude={+pump.lat} longitude={+pump.lon}>
          <button className={"poi"}>Pump</button>
        </Marker>
      ))}
    </ReactMapGL>
  );
}

export default Map;
