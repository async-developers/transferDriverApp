import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row, Image, Button } from '@themesberg/react-bootstrap';
import { CounterWidget, OngoingTripsWidget } from '../../components/Widgets';
import { faAngleRight, faCar } from '@fortawesome/free-solid-svg-icons';
import Profile from "../../assets/img/driver/a95297b322004db9.svg";
import moment from 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TourListings from '../examples/CabDriver/TourHistory/TourListings';
import { Link, Redirect } from 'react-router-dom';
import { Routes } from '../../routes';
import LoaderComponent from '../components/LoaderComponent';

const CabDriverDashboard = ({ data }) => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [nextTrip, setNextTrip] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading state

  const [analyticsData, setAnalyticsData] = useState({
    totalAssignedTours: 0,
    totalCompletedTours: 0,
    totalRevenue: 0,
    totalRides: 0,
    totalExpenses: 0,
    recentTrips: [],
    upcomingTrips: null,
    onGoingTrips: null
  });

  useEffect(() => {
    const fetchDriverAnalytics = async () => {
      try {
        const response = await axios.get(`https://yci26miwxk.execute-api.ap-southeast-1.amazonaws.com/prod/driverAnalytics?driverId=${data.id}`);
        setAnalyticsData(response.data);
        const upcomingTrip = findNextTrip(response.data.upcomingTrips);
  
        setNextTrip({
          ...upcomingTrip,
          tourTime: moment(`${upcomingTrip.tourDate} ${upcomingTrip.tourTime}`, 'YYYY-MM-DD HH:mm:ss').toDate()
        });
  
        const interval = setInterval(() => {
          setNextTrip(currentTrip => {
            if (!currentTrip) return null;
            const momentTime = moment(currentTrip.tourTime);
            momentTime.subtract(1, 'seconds');
            const formattedTime = momentTime.toISOString();
            return { ...currentTrip, tourTime: formattedTime };
          });
        }, 1000);
  
        setLoading(false); // Set loading to false after data is fetched
        return () => clearInterval(interval);
      } catch (error) {
        console.error('Error fetching driver analytics:', error);
        setLoading(false); // Ensure loading state is false even on error
      }
    };

    setUserName(data.username);
    setUserId(data.id);
    fetchDriverAnalytics();
  }, [data]);

  const findNextTrip = (trips) => {
    if (!trips || trips.length === 0) return null;

    const pendingTrips = trips
      .filter(trip => trip.status === 'pending')
      .sort((a, b) => moment(a.tourDate).isAfter(moment(b.tourDate)) ? 1 : -1);

    return pendingTrips.length > 0 ? pendingTrips[0] : null;
  };

  const getTripDetails = () => {
    return <Redirect to={Routes.ToursHistory} />;
  }

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <>
      <Row>
        <Col md={12}>
          <div className="py-4">
            <h3> Welcome {userName}</h3>
            <span>Track your trips activity, rides and rewards.</span>
          </div>
          <div className="py-4">
            <h3 className='mb-3'>On Going Trip</h3>
            <div className='custom-card'>
              <div className='image-banner'>
                <Image src={Profile} className="" />
              </div>
              <div className='custom-card-details py-4 px-4'>
                {analyticsData.onGoingTrips !== null ? (
                  <OngoingTripsWidget
                    driverId={userId}
                    bookingId={analyticsData.onGoingTrips.tourId}
                    tourId={analyticsData.onGoingTrips.tourName}
                    title={analyticsData.onGoingTrips.tourListName}
                    pickUpDate={analyticsData.onGoingTrips.tourDate}
                    pickUpTime={analyticsData.onGoingTrips.tourTime}
                    pickUpPoint={analyticsData.onGoingTrips.startLocation}
                    dropPoint={analyticsData.onGoingTrips.endLocation}
                    fare={analyticsData.onGoingTrips.fare}
                    icon={faCar}
                    iconColor="shape-primary"
                    status={analyticsData.onGoingTrips.status}
                  />
                ) : (
                    <h5>You have no ongoing trip</h5>
                  )}
              </div>
            </div>
          </div>
          <Row className="d-flex justify-content-md-center">
            <Col xs={12} sm={6} lg={3} className="justify-content-md-center">
              <div className='mb-2 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-4'>
                <h5 className='mb-0 upperCase-keyword'>upcoming trips</h5>
                <Link to="/upcoming-tours" className={analyticsData.upcomingTrips === null && "disable"}>
                  <Button variant="outline-primary" size="sm" className="m-1 upperCase-keyword" onClick={getTripDetails} disabled={analyticsData.upcomingTrips === null}>
                     <span className='space-after'>All trips </span> <FontAwesomeIcon icon={faAngleRight} />
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
          <Row className="d-flex justify-content-md-center">
            <Col xs={12} sm={6} lg={3} className="mb-4">
              {analyticsData.upcomingTrips !== null ? (
                <CounterWidget
                  bookingId={analyticsData.upcomingTrips.tourId}
                  tourId={analyticsData.upcomingTrips.tourName}
                  title={analyticsData.upcomingTrips.tourListName}
                  pickUpDate={analyticsData.upcomingTrips.tourDate}
                  pickUpTime={analyticsData.upcomingTrips.tourTime}
                  pickUpPoint={analyticsData.upcomingTrips.startLocation}
                  dropPoint={analyticsData.upcomingTrips.endLocation}
                  icon={faCar}
                  fare={analyticsData.upcomingTrips.fare}
                  iconColor="shape-secondary"
                />
              ) : (
                  <p>You have no scheduled trip</p>
                )}
            </Col>
          </Row>
          <Row className="d-flex justify-content-md-center">
            <Col xs={12} sm={6} lg={3} className="justify-content-md-center">
              <div className='mb-2 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-4'>
                <h5 className='mb-0 upperCase-keyword'>past trips</h5>
                <Link to={`/tours-history`} className={analyticsData.recentTrips===0 && "disable"}>
                  <Button variant="outline-primary" size="sm" className="m-1 upperCase-keyword" onClick={getTripDetails} disabled={analyticsData.recentTrips === 0}>
                     <span className='space-after'>All trips </span> <FontAwesomeIcon icon={faAngleRight} />
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6} lg={3} className="mb-4">
              <TourListings data={data} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default CabDriverDashboard;
