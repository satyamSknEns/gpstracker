import React, { useState,useEffect } from "react";
import axios from "axios";
// import MapContainer from "../components/mapContainer";
import MapComponent from "../components/mapContent";
const GeoLocation = () => {
  const [address, setAddress] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [location, setLocation] = useState(null);
  const [allCoords, setAllCoords] = useState([]);

  useEffect(() => {
    const storedCoords = JSON.parse(window.localStorage.getItem("coordinates"));
    if (storedCoords) {
      setAllCoords(storedCoords);
    }
  }, []);

  const handleStart = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          const newCoords = [position.coords.longitude, position.coords.latitude];
          setAllCoords(prevCoords => [...prevCoords, newCoords]);

          window.localStorage.setItem("coordinates", JSON.stringify([...allCoords, newCoords]));
        },
        (error) => {
          console.error("Error getting the location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  const handleStop = () => {
    if (navigator.geolocation) {
      navigator.geolocation.clearWatch(handleStart);
    }
  };

  console.log("location", location);
  // console.log('allCoords',allCoords);

  const handleStartPoint = () => {
    let allData = JSON.parse(window.localStorage.getItem("coordinates"));
    console.log("allData", allData);
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
  // const handleStopPoint = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.clearWatch(handleStartPoint);
  //   }
  // };

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
        <div className="flex">
        <button
            className="text-xl font-medium p-2 px-4 m-2 bg-blue-600 rounded text-white"
            onClick={handleStart}
          >
            Start
          </button>
          <button
            className="text-xl font-medium p-2 px-4 m-2 bg-blue-600 rounded text-white"
            onClick={handleStop}
          >
            Stop
          </button>
        </div>
        {location ? (
          <div>
            <h2>Your Location Details:</h2>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex">
          <button
            className="text-xl font-medium p-2 px-4 m-2 bg-blue-600 rounded text-white"
            onClick={handleStartPoint}
          >
            Get Location
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
      <div>
        <h2>All Coordinates:</h2>
        <ul>
          {allCoords.map((coord, index) => (
            <li key={index}>{`Latitude: ${coord[1]}, Longitude: ${coord[0]}`}</li>
          ))}
        </ul>
      </div>
      <MapComponent />
      {/* <MapContainer /> */}
    </section>
  );
};

export default GeoLocation;
