import './App.css';
import {GoogleLogin} from "react-google-login"
import React,{useState,useEffect} from 'react';
import Map from './Map';

function App() {

  const [loggedIn,setLoggedIn] = useState(false);
  const [currentLocation,setCurrentLocation] = useState(null);
  const [hospitals,setHospitals] = useState([]);

  return (
    <div className="App">
        {!loggedIn ? (
          <GoogleLogin 
          clientId="YOUR_CLIENT_ID"
          buttonText='Login With Google'
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          cookiePolicy={'single-host-origin'}
          />
        ) : (
          <Map 



          />
        )}
    </div>
  );
}

export default App;
