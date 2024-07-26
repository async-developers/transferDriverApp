import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment-timezone';
import Datetime from 'react-datetime';
import { Col, Row, Button, Spinner, Card, Form, Alert, InputGroup } from '@themesberg/react-bootstrap';
import axios from 'axios';
import MapWithSearch from '../MapWithSearch';

const CreateBookingForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    guestName: '',
    tourName: '',
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
    driverId: '0'
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [tourList, setTourList] = useState([]);

  useEffect(() => {
    fetchTourList();
  }, []);

  const fetchTourList = async () => {
    try {
      const response = await axios.get('https://yci26miwxk.execute-api.ap-southeast-1.amazonaws.com/prod/fetchTourList'); // Replace with your API endpoint
      setTourList(response.data); // Assuming response.data is an array of tours
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

  const handlePlaceChanged = (place, field) => {
    setFormData({
      ...formData,
      [field]: place.formatted_address,
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
      driverId: ''
    });
  };

  return (
    <>
      <Card border="light" className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <h2 className="mt-4 mb-4">Manual Booking Form</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="guestName">
                  <Form.Label>Guest Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="guestName"
                    value={formData.guestName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="tourName">
                  <Form.Label>Tour Name</Form.Label>
                  <Form.Control
                    as="select"
                    name="tourName"
                    value={formData.tourName}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Tour</option>
                    {tourList.map(tour => (
                      <option key={tour.tourId} value={tour.tourname}>{tour.tourname}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="journeyDate">
                  <Form.Label>Journey Date</Form.Label>
                  <Datetime
                    timeFormat={false}
                    closeOnSelect={true}
                    onChange={handleDateChange}
                    value={formData.journeyDate}
                    inputProps={{
                      name: 'journeyDate',
                      required: true,
                      placeholder: 'mm/dd/yyyy',
                    }}
                    renderInput={(props, openCalendar) => (
                      <InputGroup onClick={openCalendar}>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faCalendarAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          value={formData.journeyDate ? moment(formData.journeyDate).format('YYYY-MM-DD') : ''}
                          readOnly
                        />
                      </InputGroup>
                    )}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="journeyTime">
                  <Form.Label>Pick-Up Time</Form.Label>
                  <Datetime
                    dateFormat={false}
                    timeFormat={true}
                    closeOnSelect={true}
                    onChange={handleTimeChange}
                    value={formData.journeyTime}
                    inputProps={{
                      name: 'journeyTime',
                      required: true,
                      placeholder: 'hh:mm',
                    }}
                    renderInput={(props, openCalendar) => (
                      <InputGroup onClick={openCalendar}>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faClock} />
                        </InputGroup.Text>
                        <Form.Control
                          value={formData.journeyTime ? formData.journeyTime : ''}
                          readOnly
                        />
                      </InputGroup>
                    )}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
                <MapWithSearch />
            </Row>

            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="contactNumber">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="rates">
                  <Form.Label>Fare</Form.Label>
                  <Form.Control
                    type="text"
                    name="rates"
                    value={formData.rates}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="pax">
                  <Form.Label>Number of Pax</Form.Label>
                  <Form.Control
                    type="text"
                    name="pax"
                    value={formData.pax}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="remarks">
                  <Form.Label>Remarks</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  <span className="ms-2">Loading...</span>
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default CreateBookingForm;
