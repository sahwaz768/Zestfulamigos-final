'use client';
import React, { useState, useRef, useEffect } from 'react';

const Swipepagemodal = (props) => {
  const inputRef = useRef(null); // Ref for input field
  const [showModal, setShowModal] = useState(true); // State to show/hide modal
  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [errorMessage, setErrorMessage] = useState('');

  const GOOGLE_API_KEY = 'AIzaSyDzgEHJMuVZWhUtQgNbbuFr3TmJ2v3J96M';

  const getAddressFromLatLng = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted_address;
      }
      return 'Unknown Location';
    } catch {
      setErrorMessage('Failed to fetch location details.');
      return 'Unknown Location';
    }
  };

  const handleLocationSuccess = async (position) => {
    const { latitude, longitude } = position.coords;
    const address = await getAddressFromLatLng(latitude, longitude);
    // setCoords({ latitude, longitude });
    // setLocation(address);
    props.setLocation &&
      props.setLocation({ lat: latitude, lng: longitude, address });
    console.log(
      `Latitude: ${latitude}, Longitude: ${longitude}, Location: ${address}`
    );
    setShowModal(false);
  };

  const handleLocationError = () => {
    setErrorMessage('Geolocation failed. Please enter your location manually.');
  };

  const handleManualLocationSubmit = async () => {
    const manualLocation = inputRef.current.value;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(manualLocation)}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        const manualAddress = data.results[0].formatted_address;
        let city = '';
        let state = '';

        // Iterate over the address components to find the city and state
        data.results[0].address_components.forEach((component) => {
          if (component.types.includes('locality')) {
            city = component.long_name; // City name
          }
          if (component.types.includes('administrative_area_level_1')) {
            state = component.long_name; // State name
          }
        });
        // setCoords({ latitude: lat, longitude: lng });
        // setLocation(manualAddress);
        props.setLocation &&
          props.setLocation({ lat, lng, address: manualAddress, city, state });
        console.log(
          `Latitude: ${lat}, Longitude: ${lng}, Location: ${manualAddress}`
        );
        setShowModal(false);
      } else {
        setErrorMessage('Failed to fetch coordinates for the location.');
      }
    } catch {
      setErrorMessage('Error fetching the location.');
    }
  };

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleLocationSuccess,
        handleLocationError
      );
    } else {
      setErrorMessage('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      const loadGoogleMapsScript = () => {
        return new Promise((resolve, reject) => {
          if (typeof window.google !== 'undefined' && window.google.maps) {
            resolve();
          } else {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
            script.async = true;
            script.onload = resolve;
            script.onerror = () => reject('Google Maps API failed to load.');
            document.body.appendChild(script);
          }
        });
      };

      loadGoogleMapsScript()
        .then(() => {
          if (window.google && inputRef.current) {
            const autocomplete = new window.google.maps.places.Autocomplete(
              inputRef.current,
              {
                types: ['(cities)']
              }
            );

            autocomplete.addListener('place_changed', () => {
              const place = autocomplete.getPlace();
              if (place && place.formatted_address) {
                setLocation(place.formatted_address);
                console.log(`Selected Location: ${place.formatted_address}`);
              }
            });
          }
        })
        .catch((error) => setErrorMessage(error));
    }
  }, []);

  return (
    <>
      {showModal && (
        <>
          <div className="modal-overlay-swipepage"></div>

          {/* Modal content */}
          <div className="modal-swipepage">
            <h2 className="text-center ">Choose your location</h2>
            <p className="text-xs text-center text-gray-600 mt-2 mb-3">
              Zestful amigos would like to access your location, to get better
              results.
            </p>
            <div className="locationacessbtn">
              <button onClick={requestLocation}>Allow Location Access</button>
            </div>

            <h4 className="hrline mx-3 my-3 text-gray-600"> or </h4>
            <p className="">Enter Manually</p>
            <div className="enterlocationbtn mt-2">
              <input ref={inputRef} type="text" placeholder="Enter location" />
            </div>
            <button
              onClick={handleManualLocationSubmit}
              className="manual-location-btn"
            >
              Submit
            </button>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>
        </>
      )}
    </>
  );
};

export default Swipepagemodal;
