import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import Map from "./Map";
import { BrowserRouter as Router } from "react-router-dom";
import { Navigate } from 'react-router'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    if (loggedIn) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => null,
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  }, [loggedIn]);

  const handleLoginSuccess = (response) => {
    setLoggedIn(true);
    console.log("Login successfull");
    
  };

  const handleLoginFailure = (response) => {
    console.log("Error", response);
  };

  const handleMarkerClick = (hospital) => {
    setSelectedHospital(hospital);
  };

  const handleInfoWindowClose = () => {
    setSelectedHospital(null);
  };

  useEffect(() => {
    if (currentLocation) {
      axios
        .get(
          `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${currentLocation.lng},${currentLocation.lat}&limit=20&apiKey=024620af7b884a94b4d0a1a2225c7985`
        )
        .then((response) => {
          setHospitals(response.data.results);
          console.log(response.data)
        })
        .catch((error) => {
          console.log('hello',error);
        });
    }
  }, [currentLocation]);

  return (
    <Router>
      <div className="App">
        {!loggedIn ? (
          <GoogleLogin
            clientId="204320152383-0r47fhllms5nrrg0hd2r63i3c2v9lfdt.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
            cookiePolicy={"single_host_origin"}
          />
        ) : (
          <>
            <Navigate to='/user'/>
              <Map
                currentLocation={currentLocation}
                hospitals={hospitals}
                selectedHospital={selectedHospital}
                handleMarkerClick={handleMarkerClick}
                handleInfoWindowClose={handleInfoWindowClose}
              />
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
