export const extractAddressComponent = (googleadress) => {
  let city,
    state = null;
  const address = googleadress.address_components;
  for (let i = 0; i < address.length; i += 1) {
    if (address[i].types.includes('locality')) {
      city = address[i].long_name;
    } else if (address[i].types.includes('administrative_area_level_1')) {
      state = address[i].long_name;
    }
  }
  const lat =
    typeof googleadress.geometry.location.lat === 'function'
      ? googleadress.geometry.location.lat()
      : googleadress.geometry.location.lat;
  const lng =
    typeof googleadress.geometry.location.lng === 'function'
      ? googleadress.geometry.location.lng()
      : googleadress.geometry.location.lng;
  const formataddress = googleadress.formatted_address;
  return { lat, lng, formataddress, city, state };
};
export const getAddressFromLatLng = async (lat, lng) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_KEY;
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );
    const data = await response.json();
    if (data.results.length) {
      return extractAddressComponent(data.results[0]);
    }
    return 'Unknown Location';
  } catch {
    throw new Error('Failed to fetch location details.');
  }
};

export const loadGoogleMapsScript = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_KEY;
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
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

export const getLocationfrominput = async (userinput) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_KEY;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(userinput)}&key=${apiKey}`
    );
    const data = await response.json();
    if (data.results.length) {
      return extractAddressComponent(data.results[0]);
    }
  } catch (error) {
    throw new Error('Error fetching the location');
  }
};

export const getLocationDetails = (query, mapId) => {
  return new Promise((res, rej) => {
    if (!query || !query.trim().length || query.length < 4) {
      return res([]);
    }
    const mumbai = new window.google.maps.LatLng(19.076, 72.8777);
    const map = new google.maps.Map(document.getElementById('map'), {
      center: mumbai,
      zoom: 16
    });
    const request = {
      query,
      fields: ['name', 'formatted_address', 'place_id', 'geometry']
    };
    let finalresult = null;
    const service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, function (results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        service.getDetails(
          {
            placeId: results[0].place_id,
            fields: [
              'name',
              'formatted_address',
              'place_id',
              'geometry',
              'address_components'
            ]
          },
          (place, status) => {
            finalresult = {
              ...extractAddressComponent(place),
              name: place.name
            };
            const marker = new google.maps.Marker({
              map,
              position: place.geometry.location
            });
            window.google.maps.event.addListener(marker, 'click', () => {
              infowindow.setContent(place.name || '');
              infowindow.open(map);
            });
            map.setCenter(place.geometry.location);
            res(finalresult);
          }
        );
      } else {
        res([]);
      }
    });
  });
};

export function convertCompanionData(input) {
  return {
    id: (input.Companion && input.Companion[0].id) || '',
    images: input.Images || [],
    firstname: input.firstname || '',
    lastname: input.lastname || '',
    age: input.age || 18,
    state:
      input.Companion && input.Companion[0].baselocation
        ? input.Companion[0].baselocation[0].state
        : '',
    phoneno: input.phoneno || '',
    gender: input.gender || 'FEMALE',
    skintone: (input.Companion && input.Companion[0].Skintone) || '',
    bodytype: (input.Companion && input.Companion[0].bodytype) || '',
    eatinghabits: (input.Companion && input.Companion[0].eatinghabits) || '',
    smokinghabits: (input.Companion && input.Companion[0].smokinghabits) || '',
    drinkinghabits:
      (input.Companion && input.Companion[0].drinkinghabits) || '',
    city:
      input.Companion && input.Companion[0].baselocation
        ? input.Companion[0].baselocation[0].city
        : '',
    description: (input.Companion && input.Companion[0].description) || [],
    height: (input.Companion && input.Companion[0].height) || '',
    lat:
      input.Companion && input.Companion[0].baselocation
        ? input.Companion[0].baselocation[0].lat
        : '',
    lng:
      input.Companion && input.Companion[0].baselocation
        ? input.Companion[0].baselocation[0].lng
        : ''
  };
}
