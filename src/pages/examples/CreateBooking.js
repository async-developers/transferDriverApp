import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment-timezone';
import Datetime from 'react-datetime';
import { Col, Row, Button, Spinner, Card, Form, Breadcrumb, Alert, InputGroup } from '@themesberg/react-bootstrap';
import axios from 'axios';
import RecentBookingsWidget from './RecentBookingsWidget';
import CreateBookingForm from '../components/CreateBookingForm';

const CreateBooking = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    guestName: '',
    pax: '',
    email: '',
    contactNumber: '',
    journeyDate: '',
    journeyTime: '',
    pickUpPoint: '',
    destination: '',
    rates: '',
    remarks: '',
    adminId: '1',
    tourName: '', // Add tourName field to formData
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [tours, setTours] = useState([]); // State to hold fetched tours

  useEffect(() => {
    fetchTours(); // Fetch tours when component mounts
  }, []);

  const fetchTours = async () => {
    try {
      const response = await axios.get('https://yci26miwxk.execute-api.ap-southeast-1.amazonaws.com/prod/fetchTourList'); // Replace with your API endpoint
      setTours(response.data); // Assuming response.data is an array of tours with { id, tourname }
    } catch (error) {
      handleRequestError('Error fetching tours. Please try again later.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      journeyDate: moment(date).format('YYYY-MM-DD'),
    });
  };

  const handleTimeChange = (time) => {
    setFormData({
      ...formData,
      journeyTime: moment(time).format('HH:mm'),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearMessages();

    try {
      await axios.post('https://yci26miwxk.execute-api.ap-southeast-1.amazonaws.com/prod/booking', formData);
      setSuccessMessage('Booking submitted successfully.');
      resetForm();
    } catch (error) {
      handleRequestError('Error submitting booking. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestError = (errorMessage) => {
    setError(errorMessage);
    console.error(errorMessage);
  };

  const clearMessages = () => {
    setError('');
    setSuccessMessage('');
  };

  const resetForm = () => {
    setFormData({
      guestName: '',
      pax: '',
      email: '',
      contactNumber: '',
      pickUpPoint: '',
      journeyDate: '',
      journeyTime: '',
      destination: '',
      rates: '',
      remarks: '',
      adminId: '1',
      tourName: '', // Reset tourName field as well
    });
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Manual Booking</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Create a Booking</h4>
          <p className="mb-0">Use this form to create a new booking.</p>
        </div>
      </div>
      <Row>
        <Col xs={12} md={12}>
          <CreateBookingForm />
        </Col>
        {/* <Col xs={12} md={4}>
          <RecentBookingsWidget />
        </Col> */}
      </Row>
    </>
  );
};

export default CreateBooking;
