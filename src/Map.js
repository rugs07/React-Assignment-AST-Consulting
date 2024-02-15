import React, { useEffect, useRef } from "react";
import maplibre from "maplibre-gl";

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
      console.log(hospitals);
      hospitals.forEach((hospital) => {
        const marker = new maplibre.Marker({
          color: "red", // Change color to red
          draggable: false, // 
        })
          .setLngLat([hospital.geometry.coordinates[0], hospital.geometry.coordinates[1]]);

        marker.addTo(map); // Add the marker to the map

        marker.getElement().style.fontSize = "44px";

      });

      // return () => {
      //   map.remove();
      // };
    }
  }, [currentLocation, hospitals]);

  return (
    <>
    <h1>Nearby Hospitals are located by Red Markers</h1>
    <div    
      className="map-container"
      ref={mapContainerRef}
      style={{ width: "90vw", height: "90vh" }}
    ></div>
    </>
  );
}

export default Map;
