'use client';
import React, { useEffect, useRef, useState } from 'react';

const loadGoogleMapsScript = () => {
  return new Promise((resolve, reject) => {
    if (typeof window.google === 'object' && window.google.maps) {
      resolve();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDzgEHJMuVZWhUtQgNbbuFr3TmJ2v3J96M&libraries=places`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        if (window.google && window.google.maps) {
          resolve();
        } else {
          reject(new Error("Google Maps API failed to load."));
        }
      };

      script.onerror = (e) => reject(e);
      document.head.appendChild(script);
    }
  });
};

const Page = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsDisplay, setDirectionsDisplay] = useState(null);
  const [originLocation, setOriginLocation] = useState({ lat: 28.6139, lng: 77.2090 }); // Delhi
  const [destinationLocation, setDestinationLocation] = useState({ lat: 19.0760, lng: 72.8777 }); // Mumbai

  const updateLocation = () => {
    setOriginLocation({ lat: 28.6139, lng: 77.2090 }); // Keep Delhi static
    setDestinationLocation({ lat: 19.0760, lng: 72.8777 }); // Keep Mumbai static
  };

  const initializeMap = () => {
    if (window.google && window.google.maps && !map) {
      const mapOptions = {
        center: originLocation,
        zoom: 7,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      };
      const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);

      const newDirectionsService = new window.google.maps.DirectionsService();
      const newDirectionsDisplay = new window.google.maps.DirectionsRenderer();
      newDirectionsDisplay.setMap(newMap);
      setDirectionsService(newDirectionsService);
      setDirectionsDisplay(newDirectionsDisplay);

      calculateRoute(newDirectionsService, newDirectionsDisplay);
    }
  };

  const calculateRoute = (directionsService, directionsDisplay) => {
    if (directionsService && directionsDisplay && originLocation && destinationLocation) {
      const request = {
        origin: originLocation,
        destination: destinationLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          console.log("Distance:", result.routes[0].legs[0].distance.text);
          directionsDisplay.setDirections(result);
        } else {
          directionsDisplay.setDirections({ routes: [] });
          console.error("Error fetching directions: ", status);
        }
      });
    }
  };

  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => {
        initializeMap();

        // Update locations and route every 5 minutes
        const interval = setInterval(() => {
          updateLocation();
          calculateRoute(directionsService, directionsDisplay);
        }, 300000); // 5 minutes

        return () => clearInterval(interval);
      })
      .catch((error) => {
        console.error("Failed to load Google Maps API:", error);
      });
  }, [directionsService, directionsDisplay]);

  return (
    <div>
      <div id="googlemap" ref={mapRef} style={{ width: '100%', height: '582px' }}></div>
    </div>
  );
};

export default Page;



