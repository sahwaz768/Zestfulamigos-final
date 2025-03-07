import { useState, useEffect } from 'react';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_KEY;


const LocationAccess = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [userAddress, setUserAddress] = useState('');
  
    useEffect(() => {
      fetchUserLocation(); 
    }, []);
  
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
  

  return (
  <></>
  );
};

export default LocationAccess;

