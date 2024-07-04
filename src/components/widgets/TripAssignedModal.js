import React, { useState } from 'react';
import { Button, Modal } from '@themesberg/react-bootstrap';
import moment from 'moment-timezone';
import axios from 'axios';

const TripAssignedModal = ({ data }) => {
  const [viewModal, setViewModal] = useState(true);
  console.log(data)
  const handleAccept = () => {
    // Make an API call to accept the trip
    axios.post('http://ec2-54-208-162-205.compute-1.amazonaws.com:8082/acceptTrip', { tourId: data.tourId, driverId: data.driverId })
      .then(response => {
        setViewModal(false);
        console.log('Trip accepted successfully', response.data);
        // Close the modal or update UI as needed
      })
      .catch(error => {
        // Handle error
        console.error('Error accepting trip', error);
        // Optionally, show an error message or retry mechanism
      });
  };

  const handleDecline = () => {
    // Make an API call to decline the trip
    axios.post('http://ec2-54-208-162-205.compute-1.amazonaws.com:8082/declineTrip', { tourId: data.tourId, driverId: data.driverId })
      .then(response => {
        // Handle success
        setViewModal(false);
        console.log('Trip declined successfully', response.data);
        // Close the modal or update UI as needed
      })
      .catch(error => {
        // Handle error
        console.error('Error declining trip', error);
        // Optionally, show an error message or retry mechanism
      });
  };

  return (
    <Modal show={viewModal}>
      <Modal.Header closeButton>
        <Modal.Title>New Trip Assigned</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Tour Name: {data.tourName}</p>
        <p>Pick-up point: {data.startLocation}</p>
        <p>Destination point: {data.endLocation}</p>
        <p>Pick-up Date: {moment(data.tourDate).format('Do MMMM, YYYY')}</p>
        <p>Pick-up Time: {data.tourTime}</p>
        
        {/* Additional details or actions can be added here */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleAccept}>
          Accept
        </Button>
        <Button variant="danger" onClick={handleDecline}>
          Decline
        </Button>
        {/* Additional buttons or actions */}
      </Modal.Footer>
    </Modal>
  );
};

export default TripAssignedModal;
