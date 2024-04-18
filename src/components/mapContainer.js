import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapContainer = () => {
  const [position, setPosition] = useState(null);

  // Function to get user's current position
  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  console.log('position',position);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDkiE7QnfFiu3Tw4ljH3TZ1T7hZJ4zHQKk">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        zoom={15}
        center={position || { lat: 0, lng: 0 }}
        onLoad={getCurrentPosition}
      >
        {position && <Marker position={position} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
