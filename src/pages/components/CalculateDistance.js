// src/MapComponent.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';

// Your API key here
const GOOGLE_MAPS_API_KEY = 'AIzaSyBqvc7HP_JL_pjCHyHvIhoet4jdg25l4ig';

const center = { lat: 37.7749, lng: -122.4194 }; // Default center

const MapComponent = ({ origin, destination, show }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState(null);

  const directionsCallback = (result, status) => {
    if (status === 'OK') {
      setDirectionsResponse(result);

      // Extract distance from the DirectionsResult
      const route = result.routes[0];
      if (route && route.legs[0]) {
        const distanceInMeters = route.legs[0].distance.value; // Distance in meters
        const distanceInKilometers = distanceInMeters / 1000; // Convert to kilometers
        const distanceFormatted = distanceInKilometers.toFixed(2); // Set distance with 2 decimal places
        setDistance(distanceFormatted);
      }
    } else {
      console.error('Directions request failed due to ' + status);
    }
  };

  useEffect(() => {
    // Optionally, you can handle any side effects or cleanup here
  }, [distance]);

  return isLoaded ? (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={{ height: '200px', width: '100%' }}
        zoom={1}
        center={center}
        mapContainerClassName={show === false ? 'd-none' : 'd-block'}
      >
        <DirectionsService
          options={{
            origin: origin,
            destination: destination,
            travelMode: 'DRIVING',
          }}
          callback={directionsCallback}
        />
        {directionsResponse && (
          <DirectionsRenderer
            options={{
              directions: directionsResponse,
            }}
          />
        )}
      </GoogleMap>
      {distance && (
        <div>
          <span>Distance: {distance} km</span>
        </div>
      )}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default MapComponent;
