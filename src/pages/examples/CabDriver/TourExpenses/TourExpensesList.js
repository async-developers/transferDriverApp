import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Button, Card, Modal, Form, Pagination } from '@themesberg/react-bootstrap';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import moment from 'moment-timezone';

const TourExpensesList = ({data}) => {
  const [tours, setTours] = useState([]);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null); // State to track selected tour
  const [expenseAmount, setExpenseAmount] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTours();
  }, [currentPage]); // Reload tours when currentPage changes

  const fetchTours = async () => {
    try {
      const response = await axios.get(`http://ec2-54-208-162-205.compute-1.amazonaws.com:8082/fetchUpcomingAssignedTours?driverId=${data.id}&page=${currentPage}`);
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

  const handleAddExpenseSubmit = async () => {
    try {
      await axios.put(`http://ec2-54-208-162-205.compute-1.amazonaws.com:8082/addExpense/${selectedTour.tourId}`, {
        expenseAmount: expenseAmount,
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
 

      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pb-0">
          <Table hover className="user-table align-items-center">
            <thead className='thead-light'>
              <tr>
                <th className="border-bottom">Guest Name</th>
                <th className="border-bottom">Booking Date</th>
                <th className="border-bottom">Pick Up Point</th>
                <th className="border-bottom">Drop Off</th>
                <th className="border-bottom">Journey Date</th>
                <th className="border-bottom">Journey Time</th>
                <th className="border-bottom">Fare</th>
                <th className="border-bottom">Status</th>
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
            {tours.length == 0 ? (
                <tr>
                <td colSpan="9" className="text-center my-4 no-bottom-border">
                  No data found.
                </td>
              </tr>
              ) : tours.map((tour) => (
                <tr key={tour.tourId}>
                  <td>{tour.customerName}</td>
                  <td>{moment(tour.createdAt).format('Do MMMM, YYYY')}</td>
                  <td>{tour.startLocation}</td>
                  <td>{tour.endLocation}</td>
                  <td>{moment(tour.tourDate).format('Do MMMM, YYYY')}</td>
                  <td>{moment(tour.tourTime, 'HH:mm:ss').format('hh:mm A')}</td>
                  <td>{tour.fare}</td>
                  <td><span keyword me-2 btn btn-className={`upperCase-keyword upperCase-sm ${tour.status === 'Busy' ? 'btn-danger' : tour.status === 'pending' ? 'btn-warning' : 'btn-tertiary'}`}>{tour.status}</span>
                  </td>
                  <td>
                      <Button size="sm" variant="primary" onClick={() => handleAddExpense(tour)} disabled={tour.status !== 'completed'}
>
                        <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Expense
                      </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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
      <Modal as={Modal.Dialog} centered show={showAddExpenseModal} onHide={handleCloseAddExpenseModal}>
        <Modal.Header>
          <Modal.Title>Add Expense</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleCloseAddExpenseModal} />
        </Modal.Header>
        <Modal.Body>
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
    </div>
  );
};

export default TourExpensesList;
