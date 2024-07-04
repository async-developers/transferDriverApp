import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row, Card, Image, Button } from '@themesberg/react-bootstrap';
import { CounterWidget, OngoingTripsWidget, SalesValueWidget } from '../../components/Widgets';
import { faCar, faRoute, faMoneyBillAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import Profile from "../../assets/img/driver/a95297b322004db9.svg";
import moment from 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TourListHistory from '../examples/CabDriver/TourHistory/TourListHistory';
import TourListings from '../examples/CabDriver/TourHistory/TourListings';
import { Link, Redirect } from 'react-router-dom';
import { Routes } from '../../routes';
import LoaderComponent from '../components/LoaderComponent';

const CabDriverDashboard = ({ data }) => {
  const [userName, setUserName] = useState('');
  const [nextTrip, setNextTrip] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading state

  const [analyticsData, setAnalyticsData] = useState({
    totalAssignedTours: 0,
    totalCompletedTours: 0,
    totalRevenue: 0,
    totalRides: 0,
    totalExpenses: 0,
    recentTrips: [],
    upcomingTrips: [],
    onGoingTrips: []
  });

  useEffect(() => {
    setUserName(data.username);
    fetchDriverAnalytics();
  }, [data]);

  const fetchDriverAnalytics = async () => {
    try {
      const response = await axios.get(`http://ec2-54-208-162-205.compute-1.amazonaws.com:8082/driverAnalytics?driverId=${data.id}`);
      setAnalyticsData(response.data);
      const upcomingTrip = findNextTrip(response.data.upcomingTrips);

      setNextTrip({ ...upcomingTrip, tourTime: moment(`${upcomingTrip.tourDate} ${upcomingTrip.tourTime}`, 'YYYY-MM-DD HH:mm:ss').toDate() });

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

  const {
    totalAssignedTours,
    totalCompletedTours,
    totalRevenue,
    totalRides,
    recentTrips,
    upcomingTrips,
    onGoingTrips
  } = analyticsData;

  const findNextTrip = (trips) => {
    if (!trips || trips.length === 0) return null;

    const pendingTrips = trips.filter(trip => trip.status === 'pending').sort((a, b) => {
      return moment(a.tourDate).isAfter(moment(b.tourDate)) ? 1 : -1;
    });

    return pendingTrips.length > 0 ? pendingTrips[0] : null;
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

  const getTripDetails = () => {
    return <Redirect to={Routes.ToursHistory} />;
  }

  if (loading) {
    return <LoaderComponent />; // Replace LoaderComponent with your loader component
  }

  return (
    <>
      <Row>
        <Col md="12">
          <div className="py-4">
            <h3 className="upperCase-keyword">Welcome back, {userName}</h3>
            <span> Track your sales activity, rides and drivers.</span>
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
            <Col xs={12} sm={6} xl={3} className="justify-content-md-center">
              <div className='mb-2 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-4'>
                <h5 className='mb-0 upperCase-keyword'>upcoming trip</h5>
                <Link to={`/upcoming-tours`}>
                  <Button variant="outline-primary" size="sm" className="m-1 upperCase-keyword" onClick={getTripDetails}>
                    <FontAwesomeIcon icon={faPlus} /> All trips
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
          <Row className="d-flex justify-content-md-center">
            <Col xs={12} sm={6} xl={3} className="mb-4">
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
            <Col xs={12} sm={6} xl={3} className="justify-content-md-center">
              <div className='mb-2 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-4'>
                <h5 className='mb-0 upperCase-keyword'>past</h5>
                <Link to={`/tours-history`}>
                  <Button variant="outline-primary" size="sm" className="m-1 upperCase-keyword" onClick={getTripDetails}>
                    <FontAwesomeIcon icon={faPlus} /> All trips
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6} xl={3} className="mb-4">
              <TourListings data={data} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default CabDriverDashboard;
