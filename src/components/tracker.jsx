'use client';
import { getAddressFromLatLng, loadGoogleMapsScript } from '@/utils/location';
import React, { useEffect, useState } from 'react';
import Loadingbar from './Loadingbar';

const tracker = () => {
  const [bookingdetails, setbookingdetails] = useState({
    isLoading: true,
    data: null,
    error: null
  });
  // const [directionsService, setDirectionsService] = useState(null);
  // const [directionsDisplay, setDirectionsDisplay] = useState(null);

  const originLocation = { lat: 19.084763, lng: 72.837326 };
  const destinationLocation = { lat: 19.076, lng: 72.8777 };

  const initializeMap = (newbooking) => {
    console.log(newbooking, bookingdetails);
    if (bookingdetails.data || newbooking.data) {
      if (!window.google || !window.google.maps) return;
      const current =
        bookingdetails.data?.currentposition ||
        newbooking.data?.currentposition ||
        originLocation;
      const mumbai = new window.google.maps.LatLng(current.lat, current.lng);
      const mapOptions = {
        center: mumbai,
        zoom: 16,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP
      };
      const newMap = new window.google.maps.Map(
        document.getElementById('map'),
        mapOptions
      );
      const newDirectionsService = new window.google.maps.DirectionsService();
      const newDirectionsDisplay = new window.google.maps.DirectionsRenderer();
      newDirectionsDisplay.setMap(newMap);
      // setDirectionsService(newDirectionsService);
      // setDirectionsDisplay(newDirectionsDisplay);
      calculateRoute(newDirectionsService, newDirectionsDisplay, newbooking);
    }
  };

  const calculateRoute = (directionsService, directionsDisplay, newbooking) => {
    if (!directionsService || !directionsDisplay) return;
    const current =
      bookingdetails.data?.currentposition ||
      newbooking.data?.currentposition ||
      originLocation;
    const { lat, lng } = current;
    const destination =
      bookingdetails.data?.destination ||
      newbooking.data?.destination ||
      destinationLocation;
    const destcenter = new window.google.maps.LatLng(
      destination.lat,
      destination.lng
    );
    const currentcenter = new window.google.maps.LatLng(
      current.lat,
      current.lng
    );
    const request = {
      origin: currentcenter,
      destination: destcenter,
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

  const getCurrentPostion = async ({ coords }, after5mins) => {
    const { latitude, longitude } = coords;
    const params = new URL(document.location.toString()).searchParams;
    const bookingId = params.get('bookingId');
    if (!bookingId) {
      setbookingdetails({
        isLoading: false,
        data: null,
        error: "Sorry you can't able to access that page"
      });
      return;
    }
    const { getLiveLocation, updateLiveLocation } = await import(
      '@/services/user/livelocation.service'
    );
    const { data, error } = await getLiveLocation(bookingId);
    if (error) {
      setbookingdetails({ isLoading: false, data: null, error });
      return;
    }
    if (!data.currentuser || after5mins) {
      const values = await getAddressFromLatLng(latitude, longitude);
      await updateLiveLocation(values, bookingId);
    } else if (!data.currentlocation) {
      setbookingdetails({
        isLoading: false,
        data: null,
        error: 'Opposite person location is not available right now sorry!'
      });
      return;
    }
    setbookingdetails({
      isLoading: false,
      data: {
        currentposition: data.currentlocation,
        destination: data.destination
      },
      error: false
    });
    await loadGoogleMapsScript();
    initializeMap({
      data: {
        currentposition: data.currentlocation,
        destination: data.destination
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        await getCurrentPostion(position, true);
      });
    }, 300000); // 5 minutes
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        await getCurrentPostion(position);
      },
      () =>
        setbookingdetails({
          isLoading: false,
          data: null,
          error: "Sorry you can't able to access that page"
        })
    );
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   if (directionsService && directionsDisplay) {
  //     calculateRoute(directionsService, directionsDisplay);
  //   }
  // }, [directionsService, directionsDisplay]);

  if (bookingdetails.isLoading) {
    return <Loadingbar />;
  } else if (bookingdetails.error) {
    return <div>{bookingdetails.error}</div>;
  }

  return (
    <div>
      <div>
        <div id="map" style={{ width: '100%', height: '100vh' }}></div>
      </div>
    </div>
  );
};

export default tracker;
