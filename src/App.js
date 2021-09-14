import React, { useState } from "react";
import ReactMapGL, { GeolocateControl } from "react-map-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";

const App = () => {
  const [position, setPosition] = useState(0);

  const updatePosition = () => {
    setPosition(
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log(pos.coords.latitude);
        console.log(pos.coords.longitude);
        axios
          .get(
            `http://localhost:3100/geolocate/${pos.coords.latitude}/${pos.coords.longitude}/gasoline/any/`
          )
          .then((response) => console.log(response.data))
          .catch((e) => console.error(e));
      })
    );
  };

  const [viewport, setViewport] = useState({
    latitude: navigator.geolocation.getCurrentPosition.latitude,
    longitude: navigator.geolocation.getCurrentPosition.longitude,
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={
        "pk.eyJ1IjoibG9yZW56b2FuZHJlb3R0aSIsImEiOiJja3Q0ZndxYmoweHVrMzByMWdrNHd5Zno1In0.JXPUPxIQ6yLbD3HBa_pHvQ"
      }
      mapStyle={"mapbox://styles/mapbox/dark-v10"}
      onViewportChange={(viewport) => {
        setViewport(viewport);
      }}
    >
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        auto
        onGeolocate={(position) => {
          updatePosition(position);
        }}
      />

      {/* markers */}
    </ReactMapGL>
  );
};
export default App;
