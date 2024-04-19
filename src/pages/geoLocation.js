import React, { useState } from "react";
import axios from "axios";
// import MapContainer from "../components/mapContainer";
import MapComponent from "../components/mapContent";
const GeoLocation = () => {
  const [address, setAddress] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting the location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  console.log('location',location);

  const handleStartPoint = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates(position.coords);
          const { latitude, longitude } = position.coords;
          console.log("latitude", latitude, "longitude", longitude);
          getGeoLocation(latitude, longitude);
        },
        (error) => console.log(error),
        {
          enableHighAccuracy: true,
        }
      );
    }
  };
  const handleStopPoint = () => {
    if (navigator.geolocation) {
      navigator.geolocation.clearWatch(handleStartPoint);
    }
  };

  let apiEndpoint = `https://api.opencagedata.com/geocode/v1/json`;
  let apiKey = `5fbb4d8974974b549e012b3cdb059919`;
  const getGeoLocation = async (latitude, longitude) => {
    let query = `${latitude},${longitude}`;
    console.log(`${apiEndpoint}?key=${apiKey}&q=${query}&pretty=1`);
    try {
      const { data } = await axios.get(
        `${apiEndpoint}?key=${apiKey}&q=${query}&pretty=1`
      );
      console.log("response", data.timestamp.created_http);
      if (data.results[0]) {
        setAddress(data.results[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("address", address);
  console.log("coordinates", coordinates);
  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
    <div>
      <button onClick={getLocation}>Get Location</button>
      {location && (
        <div>
          <h2>Your Location Details:</h2>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
    </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex">
          <button
            className="text-xl font-medium p-2 px-4 m-2 bg-blue-600 rounded text-white"
            onClick={handleStartPoint}
          >
            Start
          </button>
          <button
            className="text-xl font-medium p-2 px-4 m-2 bg-blue-600 rounded text-white"
            onClick={handleStopPoint}
          >
            Stop
          </button>
        </div>
        {coordinates.latitude && (
          <>
            <p className="font-medium py-2">
              Latitude :{" "}
              <span className="mx-2 font-normal">{coordinates.latitude}</span>{" "}
              Longitude :
              <span className="mx-2 font-normal">{coordinates.longitude}</span>{" "}
            </p>
            <p className="font-medium ">
              Address: <span className="font-normal">{address.formatted}</span>
            </p>
          </>
        )}
      </div>
      <MapComponent />
      {/* <MapContainer /> */}
    </section>
  );
};

export default GeoLocation;
