'use client';

import React, { useEffect, useRef, useState } from 'react';

// Function to dynamically load the Google Maps script and return a promise
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
  const [userLocation, setUserLocation] = useState(null);
  const [originLocation, setOriginLocation] = useState(null);

  const DESTINATION = { lat: 23.207001, lng: 85.850998 }; // Fixed destination coordinates

  // Function to get the user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userLatLng);

          if (!map) {
            initializeMap(userLatLng);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Function to fetch origin location from API
  const fetchOriginLocation = async () => {
    try {
      const response = await fetch('/api/origin-location'); // Replace with your actual API endpoint
      const data = await response.json();
      setOriginLocation({ lat: data.latitude, lng: data.longitude });
    } catch (error) {
      console.error("Error fetching origin location from API:", error);
    }
  };

  useEffect(() => {
    // Load Google Maps script and set intervals for updating user and origin locations
    loadGoogleMapsScript()
      .then(() => {
        getUserLocation();
        fetchOriginLocation();

        // Update locations every 5 minutes
        const userLocationInterval = setInterval(getUserLocation, 300000);
        const originLocationInterval = setInterval(fetchOriginLocation, 300000);

        return () => {
          clearInterval(userLocationInterval);
          clearInterval(originLocationInterval);
        };
      })
      .catch((error) => {
        console.error("Failed to load Google Maps API:", error);
      });
  }, []);

  const initializeMap = (latlng) => {
    if (window.google && window.google.maps) {
      const mapOptions = {
        center: latlng,
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

      calculateRoute(latlng, newDirectionsService, newDirectionsDisplay);
    } else {
      console.error("Google Maps API not initialized.");
    }
  };

  const calculateRoute = (origin, directionsService, directionsDisplay) => {
    if (directionsService && directionsDisplay && origin) {
      const request = {
        origin: origin,
        destination: DESTINATION,
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
    // Recalculate the route whenever userLocation or originLocation changes
    if (userLocation && originLocation) {
      calculateRoute(originLocation, directionsService, directionsDisplay);
    }
  }, [userLocation, originLocation, directionsService, directionsDisplay]);

  return (
    <div>
      <div id="googlemap" ref={mapRef} style={{ width: '100%', height: '580px' }}></div>
    </div>
  );
};

export default Page;
