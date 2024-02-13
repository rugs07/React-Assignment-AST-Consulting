import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import Map from './Map';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
  };

  const handleLoginFailure = (response) => {
    console.log(response);
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
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLocation.lat},${currentLocation.lng}&radius=5000&type=hospital&key=AIzaSyCsQg0fqJYUTKDyQwME9qR77gsh6eYZO8I`
        )
        .then((response) => {
          setHospitals(response.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentLocation]);

  return (
    <Router>
      <div className='App'>
        {!loggedIn ? (
          <GoogleLogin
            clientId="204320152383-k8kfhplumfsjrdllug1gf83036jr4hul.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
            cookiePolicy={'single_host_origin'}
          />
        ) : (
          <>
            <Route exact path="/">
              <Map
                currentLocation={currentLocation}
                hospitals={hospitals}
                selectedHospital={selectedHospital}
                handleMarkerClick={handleMarkerClick}
                handleInfoWindowClose={handleInfoWindowClose}
              />
            </Route>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;