import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Pagination } from '@themesberg/react-bootstrap';
import axios from 'axios';
import TripInformation from '../../subComponents/TripInformation';
import { CounterWidget } from '../../../components/Widgets';

const TourList = ({ data }) => {
  const [tours, setTours] = useState([]);
  const [expenseType, setExpenseType] = useState('');
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null); // State to track selected tour
  const [expenseAmount, setExpenseAmount] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showTourDetailsModal, setShowTourDetailsModal] = useState(false); // State for tour details modal
  const [selectedTourDetails, setSelectedTourDetails] = useState(null); // State to store selected tour details
  
  const fetchTours = React.useCallback(async () => {
    try {
      const response = await axios.get(`https://yci26miwxk.execute-api.ap-southeast-1.amazonaws.com/prod/fetchUpcomingAssignedTours?driverId=${data.id}&page=${currentPage}`);
      setTours(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  },[currentPage]);
  
  useEffect(() => {
    fetchTours();
  }, [fetchTours]); // Reload tours when currentPage changes

  const handleExpenseTypeChange = (e) => {
    setExpenseType(e.target.value);
  };

  const handleAddExpenseSubmit = async () => {
    try {
      await axios.put(`https://yci26miwxk.execute-api.ap-southeast-1.amazonaws.com/prod/addExpense/${selectedTour.tourId}`, {
        expenseAmount,
        expenseType
      });
      setShowAddExpenseModal(false);
      fetchTours(); // Refresh tour list after adding expense
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleCloseAddExpenseModal = () => {
    setShowAddExpenseModal(false);
    setSelectedTour(null); // Clear selected tour
    setExpenseAmount('');
  };

  const handleCloseTourDetailsModal = () => {
    setShowTourDetailsModal(false);
    setSelectedTourDetails(null); // Clear selected tour details
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
              {tours.length === 0 ? (
                  <p> No data found.</p>
              ) : (
                tours.map((tour) => (
                <CounterWidget
                  additionalClass="mb-4"
                  bookingId={tour.tourId}
                  tourId={tour.tourName}
                  title={tour.tourListName}
                  pickUpDate={tour.tourDate}
                  pickUpTime={tour.tourTime}
                  pickUpPoint={tour.startLocation}
                  dropPoint={tour.endLocation}
                  fare={tour.fare}
                  iconColor="shape-secondary"
                />
                ))
              )}
        {/* Pagination */}
          <Pagination>
            <Pagination.Prev onClick={prevPage} disabled={currentPage === 1}> Previous </Pagination.Prev>
            <Pagination.Next onClick={nextPage} disabled={tours.length === 0 || currentPage === totalPages}> Next </Pagination.Next>
          </Pagination>


      {/* Add Expense Modal */}
      <Modal as={Modal.Dialog} centered show={showAddExpenseModal} onHide={handleCloseAddExpenseModal} dialogClassName="drawer-modal">
        <Modal.Header>
          <Modal.Title>Add Expense</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleCloseAddExpenseModal} />
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Expense Type</Form.Label>
            <Form.Select value={expenseType} onChange={handleExpenseTypeChange}>
              <option>Select Expense Type</option>
              <option value="fuel">Petrol Fee</option>
              <option value="parking">Parking Charges</option>
              <option value="toll">Toll Tax</option>
              {/* Add more expense types as needed */}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Expense Amount:</Form.Label>
            <Form.Control type="number" value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddExpenseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddExpenseSubmit}>
            Add Expense
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Tour Details Modal */}
      <Modal as={Modal.Dialog} centered show={showTourDetailsModal} onHide={handleCloseTourDetailsModal} dialogClassName="drawer-modal">
        <Modal.Header>
          <Modal.Title>Tour Details</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleCloseTourDetailsModal} />
        </Modal.Header>
        <Modal.Body className='px-0 py-0 scrollable-y'>
          {selectedTourDetails && TripInformation(selectedTourDetails)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTourDetailsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TourList;
