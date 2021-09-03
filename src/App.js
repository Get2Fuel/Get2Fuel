import React, { useState } from "react";
import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl';

import ApiCall from "./ApiCall";

const App = (() => {
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100vw",
    height: "100vh",
    zoom: 10
  });
  const [position, setPosition] = useState(0);

  const updatePosition =()=>{
    setPosition(navigator.geolocation.getCurrentPosition((pos) => { const crd = pos.coords; console.log(pos.coords.latitude);console.log(pos.coords.longitude); }));
  }

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={"pk.eyJ1IjoibG9yZW56b2FuZHJlb3R0aSIsImEiOiJja3Q0ZndxYmoweHVrMzByMWdrNHd5Zno1In0.JXPUPxIQ6yLbD3HBa_pHvQ"}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          auto
          onGeolocate={(position) => { updatePosition (position)}}
        />

        {/* markers here */}
      </ReactMapGL>
      <ApiCall props={position} />
    </div>

  )
});
export default App;






// 'Access-Control-Allow-Origin':'*',
// 'Access-Control-Allow-Headers' : 'true',
// 'Access-Control-Allow-Methods' : 'true',
// 'Access-Control-Allow-Credentials': 'false'