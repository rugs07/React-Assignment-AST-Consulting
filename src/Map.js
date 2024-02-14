import React from 'react';
import { GoogleMap, InfoWindow, Marker } from 'react-google-maps';

const Map = ({ currentLocation, hospitals, selectedHospital, handleMarkerClick, handleInfoWindowClose }) => {
  return (
    <>
      defaultZoom={14}
      defaultCenter={currentLocation}
      center={currentLocation}
    
      {hospitals.map((hospital) => (
        <Marker
          key={hospital.place_id}
          position={{
            lat: hospital.geometry.location.lat,
            lng: hospital.geometry.location.lng,
          }}
          onClick={() => handleMarkerClick(hospital)}
        />
      ))}
      {selectedHospital && (
        <InfoWindow
          position={{
            lat: selectedHospital.geometry.location.lat,
            lng: selectedHospital.geometry.location.lng,
          }}
          onCloseClick={handleInfoWindowClose}
        >
          <div>
            <h3>{selectedHospital.name}</h3>
            <p>{selectedHospital.vicinity}</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default Map;