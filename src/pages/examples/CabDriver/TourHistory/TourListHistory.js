import React, { useEffect, useState } from 'react';
import { Card, Pagination } from '@themesberg/react-bootstrap';
import { faTaxi} from '@fortawesome/free-solid-svg-icons'; // Import faEye icon
import axios from 'axios';
import { CabHistoryWidget } from '../../../../components/Widgets';

const TourListHistory = ({data}) => {
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(`https://yci26miwxk.execute-api.ap-southeast-1.amazonaws.com/prod/fetchPastAssignedTours?driverId=${data.id}&page=${currentPage}`);
        setTours(response.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    };
    
    fetchTours();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
            {tours.length === 0 ? (
              <p>
                  No data found.
                  </p>
              ) :
              tours.map((tour) => (
          <CabHistoryWidget
          bookingId={tour.tourId}
          tourId={tour.tourName}
          title={tour.bookedTourName}
          pickUpDate={tour.tourDate}
          pickUpTime={tour.tourTime}
          pickUpPoint={tour.startLocation}
          dropPoint={tour.endLocation}
          fare={tour.fare}
          icon={faTaxi}
          status={tour.status}
          iconColor="shape-secondary"
          detailsButtonEnabled="false"
        />
        ))}
      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
      <Pagination>
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} >Previous</Pagination.Prev>
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={tours.length === 0 || currentPage === totalPages} >Next</Pagination.Next>
        </Pagination>
      </div>
    </div>
  );
};

export default TourListHistory;
