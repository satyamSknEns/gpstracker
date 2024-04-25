import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";

const MapComponent = () => {
  useEffect(() => {
    let allData = JSON.parse(window.localStorage.getItem("coordinates"));
    console.log("allData", allData);
    let centeredElement;
    if (allData) {
      if (allData.length % 2 === 0) {
        const centerIndex = allData.length / 2;
        centeredElement = allData[centerIndex];
      } else {
        const centerIndex = Math.floor(allData.length / 2);
        centeredElement = allData[centerIndex];
      }

      console.log("Centered element:", centeredElement);

      mapboxgl.accessToken =
        "pk.eyJ1IjoiZW5zZW50ZXJwcmlzZXMiLCJhIjoiY2x2MjQ5NWprMGFqNjJscDhzeGZkcm5yayJ9.WloQmfc86sJgpQOQ8W9RHg";
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        //   projection:"globe",
        //   projection:"naturalEarth",
        center: centeredElement,
        zoom: 13,
      });
      map.on("load", () => {
        map.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: allData,
            },
          },
        });

        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#888",
            "line-width": 8,
          },
        });
      });

      return () => map.remove();
    }
  }, []);

  return (
    <div id="map" className="map-container min-w-[85%] sm:h-[450px] h-auto mx-auto" />
  );
};

export default MapComponent;
