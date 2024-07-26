import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Card, Button, Modal, Form, Pagination } from '@themesberg/react-bootstrap';
import { faClipboardList} from '@fortawesome/free-solid-svg-icons'; // Import faEye icon
import axios from 'axios';
import moment from 'moment-timezone';
import { ToursWidgetWithoutIcon } from '../../../components/Widgets';
import TripInformation from '../../subComponents/TripInformation';

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
  const [showDeleteAlert, setShowDeleteAlert] = useState(false); // State to control the display of delete confirmation alert
  const [deleteTourId, setDeleteTourId] = useState(null); // State to store the ID of the tour to be deleted

  useEffect(() => {
    fetchTours();
  }, [currentPage]); // Reload tours when currentPage changes

  const handleExpenseTypeChange = (e) => {
    setExpenseType(e.target.value);
  };

  const fetchTours = async () => {
    try {
      const response = await axios.get(`https://yci26miwxk.execute-api.ap-southeast-1.amazonaws.com/prod/fetchUpcomingAssignedTours?driverId=${data.id}&page=${currentPage}`);
      setTours(response.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  };

  const handleAddExpense = (tour) => {
    setSelectedTour(tour); // Set the selected tour
    setShowAddExpenseModal(true);
  };

  const handleViewDetails = (tour) => {
    setSelectedTourDetails(tour); // Set the selected tour details
    setShowTourDetailsModal(true);
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

  const toggleDeleteAlert = (tourId) => {
    setDeleteTourId(tourId);
    setShowDeleteAlert(!showDeleteAlert);
  };

  return (
    <div>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pb-0">
              {tours.length === 0 ? (
                  <p>
                    No data found.</p>
              ) : (
                tours.map((tour) => (
                  <Card key={tour.tourId} className="mb-3">
                  <Card.Body>
                    <div>
                      <div className='calendar-card-icon-wrapper'>
                        <div className="calendar d-flex mb-3 mb-sm-0">
                          <span className="calendar-month">{moment(tour.tourDate).format('MMM')}</span>
                          <span className="calendar-day py-2">{moment(tour.tourDate).format('DD')}</span>
                        </div>
                      </div>
                      <div className='trip-content'>
                        <div className="card-body-content">
                          {/* <Card.Title className='word-elipsis'>{tour.tourListName}</Card.Title> */}
                            <ToursWidgetWithoutIcon
                              title={tour.tourListName}
                              pickUpDate={tour.tourDate}
                              pickUpTime={tour.tourTime}
                              pickUpPoint={tour.startLocation}
                              dropPoint={tour.endLocation}
                              fare={tour.fare}
                              status={tour.status}
                              iconColor="shape-secondary"
                              detailsButtonEnabled="false"
                            />
                        </div>
                        <div className="d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center py-4 pb-0">
                          <Button variant="primary" size="sm" className="upperCase-keyword" onClick={() => handleViewDetails(tour)}>
                            <FontAwesomeIcon icon={faClipboardList} /> More Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                ))
              )}
        </Card.Body>
        {/* Pagination */}
        <Card.Footer className="d-flex justify-content-center">
          <Pagination>
            <Pagination.Prev onClick={prevPage} disabled={currentPage === 1}> Previous </Pagination.Prev>
            <Pagination.Next onClick={nextPage} disabled={currentPage === totalPages}> Next </Pagination.Next>
          </Pagination>
        </Card.Footer>
      </Card>

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
