import React, { useState } from "react";
import axios from "axios";
import MapContainer from "../components/mapContainer";
const GeoLocation = () => {
  const [address, setAddress] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(false);
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
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
  let apiEndpoint = `https://api.opencagedata.com/geocode/v1/json`;
  let apiKey = `2b45c37683a64ea983a95a31b2e3787c`;
  const getGeoLocation = async (latitude, longitude) => {
    let query = `${latitude},${longitude}`;
    try {
      const { data } = await axios.get(
        `${apiEndpoint}?key=${apiKey}&q=${query}&pretty=1`
      );
      console.log("response", data.timestamp.created_http);
      if (data.results[0]) {
        setAddress(data.results[0]);
        setLoading(false);
      } else {
        setLoading(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log("address", address);
  console.log("coordinates", coordinates);
  console.log("loading", loading);
  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <button
          className="text-xl font-medium p-2 m-2 bg-blue-600 rounded text-white"
          onClick={getLocation}
        >
          {!loading ? `Get Location` : `Loading...`}
        </button>
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
      <MapContainer />
    </section>
  );
};

export default GeoLocation;
