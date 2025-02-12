"use client";
import React, { useEffect, useRef, useState } from "react";

const GOOGLE_MAPS_API_KEY = "AIzaSyCtx6jVygvU6HjSbq-Fh3QvcBdZ5VYx4Uc";

const loadGoogleMapsScript = () => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
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
  const [userAddress, setUserAddress] = useState("");

  const originLocation = { lat: 28.6139, lng: 77.209 }; // Delhi
  const destinationLocation = { lat: 19.076, lng: 72.8777 }; // Mumbai

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          setUserLocation({ lat: latitude, lng: longitude });
          console.log("User Latitude:", latitude);
          console.log("User Longitude:", longitude);
          fetchUserAddress(latitude, longitude);
        },
        (error) => console.error("Error fetching user location:", error)
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const fetchUserAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      const address =
        data.results.length > 0
          ? data.results[0].formatted_address
          : "Address not found";
      setUserAddress(address);
      console.log("User Address:", address);
    } catch (error) {
      console.error("Error fetching user address:", error);
    }
  };

  const initializeMap = () => {
    if (!window.google || !window.google.maps) return;

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
  };

  const calculateRoute = (directionsService, directionsDisplay) => {
    if (!directionsService || !directionsDisplay) return;

    const request = {
      origin: originLocation,
      destination: destinationLocation,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      } else {
        console.error("Error fetching directions:", status);
      }
    });
  };

  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => {
        initializeMap();
        fetchUserLocation();
      })
      .catch((error) =>
        console.error("Failed to load Google Maps API:", error)
      );

    // Update user's location every 5 minutes
    const interval = setInterval(() => {
      fetchUserLocation();
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
      <div ref={mapRef} style={{ width: "100%", height: "100vh" }}></div>
      
    </div>
  );
};

export default Page;
