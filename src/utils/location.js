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

  export function convertCompanionData(input) {
    return {
        images: input.Images || [],
        firstname: input.firstname || '',
        lastname: input.lastname || '',
        age: input.age || 18,
        state: input.Companion && input.Companion[0].baselocation ? input.Companion[0].baselocation[0].state : '',
        phoneno: input.phoneno || '',
        gender: input.gender || 'FEMALE', 
        skintone: input.Companion && input.Companion[0].Skintone || '',
        bodytype: input.Companion && input.Companion[0].bodytype || '',
        eatinghabits: input.Companion && input.Companion[0].eatinghabits || '',
        smokinghabits: input.Companion && input.Companion[0].smokinghabits || '',
        drinkinghabits: input.Companion && input.Companion[0].drinkinghabits || '',
        city: input.Companion && input.Companion[0].baselocation ? input.Companion[0].baselocation[0].city : '',
        description: input.Companion && input.Companion[0].description || [],
        height: input.Companion && input.Companion[0].height || ''
    };
}