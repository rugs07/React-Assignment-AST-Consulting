import React,{useState,useEffect} from "react";
import axios from "axios";
import "./App.css"
import Map from "./Map";

function Home() {

  const [currentLocation, setCurrentLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showMap,setShowMap] = useState(false);

  const handlelocation =  () => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          console.log(currentLocation)
        },
        () => null,
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
  };

  const handleMarkerClick = (hospital) => {
    setSelectedHospital(hospital);
  };

  const handleInfoWindowClose = () => {
    setSelectedHospital(null);
  };

  useEffect(() => {
    if (currentLocation) {
        console.log("I Am here")
      axios
        .get(
        `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${currentLocation.lng},${currentLocation.lat},5000&limit=20&apiKey=024620af7b884a94b4d0a1a2225c7985`
        )
        .then((response) => {
        setHospitals(response.data.features);
          console.log(response.data);
          console.log(response.data.features[0])
          setShowMap(true);
        })
        .catch((error) => {
          console.log("Error, Check the code once again", error);
        });
    }
  }, [currentLocation]);

  return (
    <div className="Home">
      {!showMap && (
        <button onClick={handlelocation}>Fetch User Location and Show nearby Hospitals</button>
      )}
      {showMap && (
        <Map 
        currentLocation={currentLocation}
        hospitals={hospitals}
        handleMarkerClick={handleMarkerClick}
        handleInfoWindowClose={handleInfoWindowClose}
        />
      )}
    </div>
  );
}

export default Home;
