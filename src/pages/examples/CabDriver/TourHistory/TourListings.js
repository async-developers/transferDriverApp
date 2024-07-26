import React, { useEffect, useState } from 'react';

import { faCar } from '@fortawesome/free-solid-svg-icons'; // Import faEye icon
import axios from 'axios';
import { CabHistoryWidget } from '../../../../components/Widgets';

const TourListings = ({data}) => {
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTours();
  }, [currentPage]);

  const fetchTours = async () => {
    try {
      const response = await axios.get(`https://yci26miwxk.execute-api.ap-southeast-1.amazonaws.com/prod/fetchPastAssignedTours?driverId=${data.id}&page=${currentPage}`);
      console.log(response.data)
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
        <>
            {tours.length == 0 ? (
                <>
                    <p>No data found.</p>
                </>
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
                icon={faCar}
                status={tour.status}
                iconColor="shape-secondary"
                detailsButtonEnabled="false"
                />
              ))}
        </>
  );
};

export default TourListings;
