'use client';
import React, { useEffect, useRef, useState } from 'react';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_KEY;

const loadGoogleMapsScript = () => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = (e) => reject(e);
      document.head.appendChild(script);
    }
  });
};

const tracker = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsDisplay, setDirectionsDisplay] = useState(null);
  // const [userLocation, setUserLocation] = useState(null);
  //const [userAddress, setUserAddress] = useState("");

  const originLocation = { lat: 28.6139, lng: 77.209 }; // Delhi
  const destinationLocation = { lat: 19.076, lng: 72.8777 }; // Mumbai

  const initializeMap = () => {
    if (!window.google || !window.google.maps) return;

    const mapOptions = {
      center: originLocation,
      zoom: 7,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP
    };

    const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);

    const newDirectionsService = new window.google.maps.DirectionsService();
    const newDirectionsDisplay = new window.google.maps.DirectionsRenderer();
    newDirectionsDisplay.setMap(newMap);
    setDirectionsService(newDirectionsService);
    setDirectionsDisplay(newDirectionsDisplay);

    calculateRoute(newDirectionsService, newDirectionsDisplay);
  };

  const calculateRoute = (directionsService, directionsDisplay) => {
    if (!directionsService || !directionsDisplay) return;

    const request = {
      origin: originLocation,
      destination: destinationLocation,
      travelMode: window.google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      } else {
        console.error('Error fetching directions:', status);
      }
    });
  };

  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => {
        initializeMap();
        //  fetchUserLocation();
      })
      .catch((error) =>
        console.error('Failed to load Google Maps API:', error)
      );

    // Update user's location every 5 minutes
    const interval = setInterval(() => {
      initializeMap();
      // fetchUserLocation();
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (directionsService && directionsDisplay) {
      calculateRoute(directionsService, directionsDisplay);
    }
  }, [directionsService, directionsDisplay]);

  return (
    <div>
      <div>
        <div ref={mapRef} style={{ width: '100%', height: '100vh' }}></div>
      </div>
    </div>
  );
};

export default tracker;
