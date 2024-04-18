import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';

const MapWithGPS = () => {
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [path, setPath] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);

  const mapEvents = useMapEvents({
    click(e) {
      if (!startPoint) {
        setStartPoint(e.latlng);
      } else if (!endPoint) {
        setEndPoint(e.latlng);
      }
    },
  });

  // Function to calculate the path between start and end points
  const calculatePath = () => {
    // Here you can use any algorithm to calculate the path, for simplicity, I'm just connecting start and end points directly.
    if (startPoint && endPoint) {
      setPath([startPoint, endPoint]);
    }
  };

  // Function to track user's current location
  const trackLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition([latitude, longitude]);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {startPoint && <Marker position={startPoint}><Popup>Start Point</Popup></Marker>}
      {endPoint && <Marker position={endPoint}><Popup>End Point</Popup></Marker>}
      {path.length > 0 && <Polyline positions={path} color="blue" />}
      {currentPosition && <Marker position={currentPosition}><Popup>Your Location</Popup></Marker>}
      {mapEvents}
      <button onClick={calculatePath}>Calculate Path</button>
      <button onClick={trackLocation}>Track Location</button>
    </MapContainer>
  );
};

export default MapWithGPS;
