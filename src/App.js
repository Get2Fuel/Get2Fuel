import React, { useState } from "react";
import ReactMapGL, { GeolocateControl } from 'react-map-gl';
import axios from "axios";
import 'mapbox-gl/dist/mapbox-gl.css';

const App = (() => {
  //promise che serve per far si che ho subito le coordinate giuste
  async function getLocation() {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(posi => {
        res(updatePosition(posi));
      }, rej)
    })
  }
  //funzione che costruisce l'url (non dovrebbe più servire col server express)
  const buildURL = (details) => {
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    const str = "https://fathomless-chamber-48058.herokuapp.com/https://carburanti.mise.gov.it/OssPrezziSearch/ricerca/position?" + formBody;
    return str;
  }
  const [position, setPosition] = useState(0);

  const updatePosition = () => {
    setPosition(navigator.geolocation.getCurrentPosition((pos) => {
      /******************************************************************************* */
      console.log(pos.coords.latitude);
      console.log(pos.coords.longitude);
      /******************************************************************************* */
      var details = {
        "pointsListStr": pos.coords.latitude + "-" + pos.coords.longitude,
        "carb": "1-0",
      }
      const url = buildURL(details);

      axios.post(url)
        .then(response => console.log(response.data))
        .catch(e => console.error(e));
    }));

  }
  //parametri per la mappa
  const [viewport, setViewport] = useState({
    latitude: getLocation().latitude,
    longitude: getLocation().longitude,
    width: "100vw",
    height: "100vh",
    zoom: 10
  });

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
          onGeolocate={(position) => { updatePosition(position) }}
        />

        {/* markers */}
      </ReactMapGL>
    </div>

  )
});
export default App;
