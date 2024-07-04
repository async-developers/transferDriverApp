import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Table, Card, Pagination, Dropdown, Button } from '@themesberg/react-bootstrap';
import { faCar, faEdit, faTrashAlt, faEye, faExpand, faMinus} from '@fortawesome/free-solid-svg-icons'; // Import faEye icon
import axios from 'axios';
import moment from 'moment-timezone';
import { CabHistoryWidget, CounterWidget } from '../../../../components/Widgets';

const TourListHistory = ({data}) => {
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTours();
  }, [currentPage]);

  const fetchTours = async () => {
    try {
      const response = await axios.get(`http://ec2-54-208-162-205.compute-1.amazonaws.com:8082/fetchPastAssignedTours?driverId=${data.id}&page=${currentPage}`);
      setTours(response.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Card border="light" className="table-wrapper table-responsive shadow-sm mb-3">
        <Card.Body>
            {tours.length == 0 ? (
              <p>
                  No data found.
                  </p>
              ) :
              tours.map((tour) => (
          <CabHistoryWidget
          title={tour.startLocation}
          pickUpDate={tour.tourDate}
          pickUpTime={tour.tourTime}
          pickUpPoint={tour.startLocation}
          dropPoint={tour.endLocation}
          fare={tour.fare}
          icon={faCar}
          status={tour.status}
          iconColor="shape-secondary"
          detailsButtonEnabled="false"
        />
              ))}
        </Card.Body>
              </Card>
      {/* Pagination */}
      <div className="d-flex justify-content-center">
      <Pagination>
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} >Previous</Pagination.Prev>
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} >Next</Pagination.Next>
        </Pagination>
      </div>
    </div>
  );
};

export default TourListHistory;
