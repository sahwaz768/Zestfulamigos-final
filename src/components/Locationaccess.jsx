import { useRef, useState } from 'react';

const LocationAccess = ({ setLocation }) => {
  const inputRef = useRef();
  const [locationInput, setLocationInput] = useState('');
  const [error, setError] = useState('');

  const handleManualLocationSubmit = async () => {
    if (!locationInput || locationInput.trim().length < 4) {
      setError('Input must be minimum 4 char');
    }
    try {
      const { loadGoogleMapsScript, getLocationDetails } = await import(
        '@/utils/location'
      );
      await loadGoogleMapsScript();
      const results = await getLocationDetails(locationInput);
      setLocation(results);
    } catch (error) {
      console.log(error);
      setError('Some error occured please try again!');
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        value={locationInput}
        placeholder="Enter location"
        onChange={(e) => {
          if (error) {
            setError('');
          }
          setLocationInput(e.target.value);
        }}
        className="meetupinputfield"
      />
      <button
        type="button"
        onClick={handleManualLocationSubmit}
        className="meet-up-btn"
      >
        Check
      </button>
      {error && <p className="text-xs text-pink-600">{error}</p>}

      <div id="map" style={{ width: '400px', height: '400px' }}></div>
    </>
  );
};

export default LocationAccess;
