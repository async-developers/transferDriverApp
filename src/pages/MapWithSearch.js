import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col } from '@themesberg/react-bootstrap';

const MapWithSearch = () => {
  const [showMap1, setShowMap1] = useState(false);
  const [showMap2, setShowMap2] = useState(false);

  useEffect(() => {
    const initMap = (mapElementId, searchInputId) => {
      // Create map
      const map = new window.google.maps.Map(document.getElementById(mapElementId), {
        center: { lat: 30.266666, lng: -97.733330 },
        zoom: 8,
      });

      // Reset the value of the search box
      document.getElementById(searchInputId).value = '';

      const input = document.getElementById(searchInputId);

      // Create new searchbox instance
      const searchBox = new window.google.maps.places.SearchBox(input);

      // Set search to stay within bounds first
      map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds());
      });

      // Array to hold markers
      let markers = [];

      // When user selects prediction from list
      searchBox.addListener('places_changed', () => {
        // Get places from search box
        const places = searchBox.getPlaces();

        // If no places then return (do nothing)
        if (places.length === 0) {
          return;
        }

        // Clear previous markers
        markers.forEach(marker => {
          marker.setMap(null);
        });
        markers = [];

        // Create bounds object
        const bounds = new window.google.maps.LatLngBounds();

        // Loop through each place
        places.forEach(place => {
          if (!place.geometry) {
            console.log('Returned place contains no geometry');
            return;
          }

          // Add marker for each place
          markers.push(new window.google.maps.Marker({
            map,
            title: place.name,
            position: place.geometry.location,
          }));

          // Extend bounds to include place
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });

        // Fit map to bounds
        map.fitBounds(bounds);
      });
    };

    // Load Google Maps API script
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBqvc7HP_JL_pjCHyHvIhoet4jdg25l4ig&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        // Initialize maps
        initMap('map1', 'search1'); // First map
        initMap('map2', 'search2'); // Second map
      };
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    };

    loadGoogleMapsScript();
  }, []);

  // Handle change in input fields to show maps
  const handleInputChange = (e, mapNumber) => {
    const value = e.target.value;
    if (mapNumber === 1) {
      setShowMap1(value.trim().length > 0);
    } else if (mapNumber === 2) {
      setShowMap2(value.trim().length > 0);
    }
  };

  return (
    <>
      <Col xs={12} md={6}>
        <Form.Group controlId="search1">
          <Form.Label>Pick-Up Point</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search..."
            onChange={(e) => handleInputChange(e, 1)}
          />
        </Form.Group>
        <div id="map1" style={{ height: '400px' }}></div>
      </Col>
      <Col xs={12} md={6}>
        <Form.Group controlId="search2">
          <Form.Label>Destination</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search..."
            onChange={(e) => handleInputChange(e, 2)}
          />
        </Form.Group>
        <div id="map2" style={{ height: '400px' }}></div>
      </Col>
    </>
  );
};

export default MapWithSearch;
