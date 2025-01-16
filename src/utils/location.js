export const getAddressFromLatLng = async (lat, lng, apiKey) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted_address;
      }
      return 'Unknown Location';
    } catch {
      throw new Error('Failed to fetch location details.');
    }
  };