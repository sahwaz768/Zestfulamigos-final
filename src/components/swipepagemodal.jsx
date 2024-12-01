'use client'
import React, { useState, useRef, useEffect } from 'react';


const Swipepagemodal = () => {
  const inputRef = useRef(null); // Ref for input field
  const [showModal, setShowModal] = useState(true); // State to show/hide modal
  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [errorMessage, setErrorMessage] = useState('');

  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API;
  console.log(GOOGLE_API_KEY)

  const getAddressFromLatLng = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      console.log('Geocode Response:', data); // Debug response
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted_address;
      }
      return 'Unknown Location';
    } catch (error) {
      console.error('Geocoding Error:', error); // Debug error
      setErrorMessage('Failed to fetch location details.');
      return 'Unknown Location';
    }
  };

  const handleLocationSuccess = async (position) => {
    console.log('Geolocation Success:', position); // Debug position
    const { latitude, longitude } = position.coords;
    const address = await getAddressFromLatLng(latitude, longitude);
    setCoords({ latitude, longitude });
    setLocation(address);
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}, Location: ${address}`); // Debug coordinates
    setShowModal(false);
  };

  const handleLocationError = (error) => {
    console.error('Geolocation Error:', error); // Debug error
    setErrorMessage('Geolocation failed. Please enter your location manually.');
  };

  const handleManualLocationSubmit = async () => {
    const manualLocation = inputRef.current.value;
    console.log('Manual Location Input:', manualLocation); // Debug input
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(manualLocation)}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      console.log('Manual Geocode Response:', data); // Debug response
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        const manualAddress = data.results[0].formatted_address;
        setCoords({ latitude: lat, longitude: lng });
        setLocation(manualAddress);
        console.log(`Latitude: ${lat}, Longitude: ${lng}, Location: ${manualAddress}`); // Debug coordinates
        setShowModal(false);
      } else {
        setErrorMessage('Failed to fetch coordinates for the location.');
      }
    } catch (error) {
      console.error('Manual Geocoding Error:', error); // Debug error
      setErrorMessage('Error fetching the location.');
    }
  };

  const requestLocation = () => {
    console.log('Requesting Geolocation...'); // Debug request
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError);
    } else {
      console.error('Geolocation Not Supported'); // Debug unsupported
      setErrorMessage('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    console.log('Initializing Google Maps Script...'); // Debug initialization
    const loadGoogleMapsScript = () => {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
          console.log('Google Maps API Already Loaded'); // Debug script status
          resolve();
        } else {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
          script.async = true;
          script.defer = true;
          script.onload = resolve;
          script.onerror = () => {
            console.error('Google Maps API Failed to Load'); // Debug error
            reject('Google Maps API failed to load.');
          };
          document.body.appendChild(script);
        }
      });
    };

    loadGoogleMapsScript()
      .then(() => {
        console.log('Google Maps API Loaded Successfully'); // Debug success
        if (window.google && inputRef.current) {
          const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
            types: ['(cities)'],
          });
          console.log('Autocomplete Initialized:', autocomplete); // Debug autocomplete instance

          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            console.log('Place Changed Event:', place); // Debug place details
            if (place && place.formatted_address) {
              setLocation(place.formatted_address);
              console.log(`Selected Location: ${place.formatted_address}`); // Debug selected location
            } else {
              setErrorMessage('No address found.');
            }
          });
        }
      })
      .catch((error) => {
        console.error('Google Maps Initialization Error:', error); // Debug error
        setErrorMessage(error);
      });
  }, []);

  return (
    <>
     {showModal && (
        <>
         
          <div className="modal-overlay-swipepage"></div>
          
          {/* Modal content */}
          <div className="modal-swipepage">
            <h2 className='text-center '>Choose your location</h2>
            <p className='text-xs text-center text-gray-600 mt-2 mb-3'>Zestful amigos would like to access your location, to get better results.</p>
            <div className='locationacessbtn'>
            <button onClick={requestLocation}>Allow Location Access</button>
            </div>

            <h4 className="hrline mx-3 my-3 text-gray-600"> or </h4>
            <p className=''>Enter Manually</p>
            <div className='enterlocationbtn mt-2'>
            <input ref={inputRef} type="text" placeholder="Enter location" />
            </div>
            <button onClick={handleManualLocationSubmit} className='manual-location-btn'>Submit</button>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>
        </>
      )}
    </>
  );
};

export default Swipepagemodal;
