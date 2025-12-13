import { useRef, useState } from 'react';

const LocationAccess = ({ setLocation, mapkey }) => {
  const inputRef = useRef();
  const [locationInput, setLocationInput] = useState('');
  const [error, setError] = useState('');
  const [isLocationSet, setisLocationset] = useState(false);

  const handleManualLocationSubmit = async () => {
    if (!locationInput || locationInput.trim().length < 4) {
      setError('Input must be minimum 4 char');
    }
    try {
      const { loadGoogleMapsScript, getLocationDetails } = await import(
        '@/utils/location'
      );
      await loadGoogleMapsScript();
      const results = await getLocationDetails(
        locationInput,
        mapkey ? `map${mapkey}` : 'map'
      );
      if (!isLocationSet && results) {
        setisLocationset(() => true);
      }
      if (results) {
        console.log(results);
        setLocation(results);
      } else {
        setError('Please provide a valid place');
      }
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

      <div
        id={mapkey ? `map${mapkey}` : 'map'}
        className={isLocationSet ? 'w-[20rem] md:w-160 h-100 my-5' : ''}
      ></div>
    </>
  );
};

export default LocationAccess;
