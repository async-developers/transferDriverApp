import React, { useState, useEffect } from 'react';
import { Row, Col, Card, ListGroup,Image } from '@themesberg/react-bootstrap';
import axios from 'axios'; // Assuming you use axios for HTTP requests
import moment from 'moment-timezone';
import NOTIFICATIONS_DATA from "../../data/notifications";


const RecentBookingsWidget = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecentBookings();
  }, []);

  const fetchRecentBookings = async () => {
    setLoading(true);
    try {
      // Replace with actual endpoint to fetch recent bookings
      const response = await axios.get('https://yci26miwxk.execute-api.ap-southeast-1.amazonaws.com/prod/fetchRecentBookings');
      setBookings(response.data); // Assuming response.data is an array of booking objects
    } catch (error) {
      setError('Error fetching recent bookings. Please try again later.');
      console.error('Error fetching recent bookings:', error);
    } finally {
      setLoading(false);
    }
  };



  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);

  const Notification = (props) => {
    const { link, sender, image, time, message, read = false } = props;
    const readClassName = read ? "" : "text-danger";

    return (
      <ListGroup.Item action className="border-bottom border-light">
        <Row className="align-items-center">
          <Col className="col-auto">
            <Image src="" className="user-avatar lg-avatar rounded-circle" />
          </Col>
          <Col className="ps-0 ms--2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="h6 mb-0 text-small">"sender"</h4>
              </div>
              <div className="text-end">
                <small className="read">"time"</small>
              </div>
            </div>
            <p className="font-small mt-1 mb-0">message</p>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  };

  return (
    <>
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <h5 className="mb-0">Recent Bookings</h5>
      </Card.Header>
      <Card.Body>
        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
        {bookings.length === 0 && !loading && <p>No recent bookings found.</p>}
        <ListGroup>
          {bookings.map((booking, index) => (
            // <ListGroup.Item key={index} action className="border-start">
            //   <Row className="align-items-center">
            //     <Col xs={8} md={12}>
            //       <p className="mb-1">
            //         <strong>{booking.adminFirstName} {booking.adminLastName} </strong> booked a ride for <strong>{booking.customerFullName}</strong> from{' '}
            //         <strong>{booking.startLocation}</strong> to <strong>{booking.endLocation}</strong>. 
            //         Travelling with <strong><i>{booking.driverFirstName} {booking.driverLastName}</i></strong> on {moment(booking.tourDate).format('YYYY-MM-DD')}</p>
            //     </Col>
            //   </Row>
            // </ListGroup.Item>
<ListGroup.Item action className=" list-group-flush">
        <Row className="align-items-center">
      
          <Col className="ps-0 ms--2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="h6 mb-0 text-small">{booking.adminFirstName} {booking.adminLastName}</h4>
              </div>
              <div className="text-end">
                <small className="read">{moment(booking.tourDate).format('Do MMMM, YYYY')}</small>
              </div>
            </div>
            <p className="font-small mt-1 mb-0">booked a ride for <strong>{booking.customerFullName}</strong> from{' '}</p>
          </Col>
        </Row>
      </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
    </>
  );
};

export default RecentBookingsWidget;
