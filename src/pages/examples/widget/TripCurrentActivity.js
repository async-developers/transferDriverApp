import React, { useState } from 'react';
import moment from 'moment';
import { Modal, Button, Card} from '@themesberg/react-bootstrap';

const TripCurrentActivity = ( nextTrip ) => {
  const [showModal, setShowModal] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const handleCompleteTrip = () => {
    setShowModal(true);
  };

  const handleAddExpenses = () => {
    // Implement logic to add expenses and stop the trip
    setShowModal(false);
  };

  const formatTimeRemaining = (tourTime) => {
    if (!tourTime) return '';
  
    const currentTime = moment();
    const tourStartTime = moment(tourTime);
    
    if (currentTime.isAfter(tourStartTime)) {
      return 'Trip has already started';
    }
  
    const duration = moment.duration(tourStartTime.diff(currentTime));
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const seconds = duration.seconds();
  
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };
  

  return (
    <div className="py-4">
      <Card>
        <Card.Body>
          {nextTrip && (
            <>
              <Card.Title>{nextTrip.tourName}</Card.Title>
              <Card.Text>
                <p>Start Location: {nextTrip.startLocation}</p>
                <p>End Location: {nextTrip.endLocation}</p>
                <p>Fare: ${nextTrip.fare}</p>
                <p>Tour Date: {moment(nextTrip.tourDate).format('MMMM Do YYYY')}</p>
                <p>Tour Time: {moment(nextTrip.tourTime, 'HH:mm:ss').format('h:mm A')}</p>
                <p>Time Remaining: {formatTimeRemaining(nextTrip.tourTime)}</p>
              </Card.Text>
              <Button variant="primary" onClick={handleCompleteTrip}>Complete Trip</Button>
            </>
          )}
        </Card.Body>
      </Card>
      {showModal && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Expenses and Stop Trip</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Form or content for adding expenses */}
            <p>Add your expenses here</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddExpenses}>Save Expenses</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default TripCurrentActivity;
