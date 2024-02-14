import React,{useState,useEffect} from "react";
import Map from "./Map";
import axios from "axios";

function Home() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);

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
        console.log("i Am here")
      axios
        .get(
        `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${currentLocation.lng},${currentLocation.lat},5000&limit=20&apiKey=024620af7b884a94b4d0a1a2225c7985`
        )
        .then((response) => {
        setHospitals(response.data.features);
          console.log(response.data);
          console.log(response.data.features[0])
        //   console.log(hospitals);
        })
        .catch((error) => {
          console.log("Error Coming Bhidu Chekc the code once again", error);
        });
    }
  }, [currentLocation]);

  return (
    <div>
      <button onClick={handlelocation}>
        Fetch User Location and Search Nearby Hospitals
      </button>
      {/* <Map
        currentLocation={currentLocation}
        hospitals={hospitals}
        selectedHospital={selectedHospital}
        handleMarkerClick={handleMarkerClick}
        handleInfoWindowClose={handleInfoWindowClose}
      /> */}
    </div>
  );
}

export default Home;
