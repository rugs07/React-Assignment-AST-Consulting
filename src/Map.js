import React, { useEffect, useRef } from "react";
import maplibre from "maplibre-gl";
import "./App.css"

function Map({
  currentLocation,
  hospitals
}) {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const myAPIKey = "024620af7b884a94b4d0a1a2225c7985";
    const mapStyle =
      "https://maps.geoapify.com/v1/styles/osm-bright-smooth/style.json";

    if (
      currentLocation?.lng &&
      currentLocation?.lat &&
      mapContainerRef.current
    ) {
      const initialState = {
        lng: currentLocation.lng,
        lat: currentLocation.lat,
        zoom: 8,
      };

      const map = new maplibre.Map({
        container: mapContainerRef.current,
        style: `${mapStyle}?apiKey=${myAPIKey}`,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom,
      });
      map.addControl(new maplibre.NavigationControl());

      console.log(hospitals);
      hospitals.forEach((hospital) => {
        const marker = new maplibre.Marker({
          key: hospital.place_id,
          anchor: 'bottom',
          offset: [0, -6],
          color: "red",
          draggable: false
       }).setLngLat([hospital.properties.lon, hospital.properties.lat]).addTo(map)
        console.log(hospital);
        console.log(marker);

        marker.getElement().style.fontSize = "44px";
        marker.getElement().style.transform = "scale(1)";
        
        });

      return () => {
        map.remove();
        console.log("Cache Cleared")
      };
    }
  }, [currentLocation, hospitals]);

  return (
    <>
    <h1 style={{ fontSize: '24px', color: '#333', marginBottom: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }} >Nearby Hospitals are located by Red Markers</h1>
    <div    
      className="map-container"
      ref={mapContainerRef}
      style={{ width: "90vw", height: "90vh" }}
    ></div>
    </>
  );
}

export default Map;
