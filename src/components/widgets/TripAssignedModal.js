import React, { useState } from 'react';
import { Button, Modal } from '@themesberg/react-bootstrap';
import moment from 'moment-timezone';
import axios from 'axios';

const TripAssignedModal = ({ data }) => {
  const [viewModal, setViewModal] = useState(true);
  const handleAccept = () => {
    axios.post('https://yci26miwxk.execute-api.ap-southeast-1.amazonaws.com/prod/acceptTrip', { tourId: data.tourId, driverId: data.driverId })
      .then(response => {
        setViewModal(false);
      })
      .catch(error => {
        // Handle error
        console.error('Error accepting trip', error);
        // Optionally, show an error message or retry mechanism
      });
  };

  const handleDecline = () => {
    // Make an API call to decline the trip
    axios.post('https://yci26miwxk.execute-api.ap-southeast-1.amazonaws.com/prod/declineTrip', { tourId: data.tourId, driverId: data.driverId })
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
    <Modal show={viewModal} centered className='mx-0'>
      <Modal.Header>
        <Modal.Title className='d-block w-100 responsive-modal-font-title'>
            {data.bookedTourName}
          <span className='d-block f-20 fw-400'>
            Scheduled on {moment(data.tourDate).format('Do MMMM, YYYY')} At {data.tourTime}
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p> <span className='fw-bold'>Pick-up:</span> {data.startLocation}</p>
        <p> <span className='fw-bold'>Destination:</span> {data.endLocation}</p>
        <p> <span className='fw-bold mb-0'>Fare:</span> {data.fare}</p>
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
