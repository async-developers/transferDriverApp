// OngoingTripsWidget.js

import React from 'react';
import { Table, Button } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const OngoingTripsWidget = ({ trips, onAddExpenses }) => {
  // Check if trips is undefined or null, or if trips.length === 0
  if (!trips || trips.length === 0) {
    return (
      <div>No ongoing trips</div>
    );
  }

  // Filter to get only the last 5 records
  const lastFiveTrips = trips.slice(-5);

  return (
    <Table responsive className="align-items-center table-flush">
      <thead className="thead-light">
        <tr>
          <th>Trip ID</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Distance (km)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {lastFiveTrips.map((trip) => (
          <tr key={trip.id}>
            <td>{trip.id}</td>
            <td>{trip.startTime}</td>
            <td>{trip.endTime}</td>
            <td>{trip.distance}</td>
            <td>
              <Button variant="primary" size="sm" onClick={() => onAddExpenses(trip.id)}>
                <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Expenses
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OngoingTripsWidget;
