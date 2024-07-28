import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import Datetime from 'react-datetime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPersonBooth, faUnlockAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Card, Button, Container, InputGroup, Spinner, Alert } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import BgImage from '../../assets/img/illustrations/signin.svg';
import { Routes } from '../../routes';

export class DriverSignUpPage extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      birthday: '',
      address: '',
      joinedDate: '',
      drivingLicence: '',
      carNumber: '',
      contactNumber: '',
      password: '',
      confirmPassword: '',
      userRole: 'driver',  // Added userRole
      loading: false,
      error: '',
      success: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeBirthDate = this.changeBirthDate.bind(this);
    this.changeJoiningDate = this.changeJoiningDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.scrollRef = React.createRef();
    this.scrollToMessageAfterSubmitForm = this.scrollToMessageAfterSubmitForm.bind(this);
  }

  scrollToMessageAfterSubmitForm = () => {
    window.scrollTo({
      behavior: "smooth",
      top: this.scrollRef.current
    });
  };
  

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  changeBirthDate(event) {
    this.setState({ birthday: event.format('YYYY-MM-DD') });
  }

  changeJoiningDate(event) {
    this.setState({ joinedDate: event.format('YYYY-MM-DD') });
  }

  async onSubmit(e) {
    e.preventDefault();
    const { confirmPassword, password, birthday, joinedDate } = this.state;

    if (password !== confirmPassword) {
      this.scrollToMessageAfterSubmitForm();

      this.setState({ error: 'Passwords do not match.' });
      return;
    }

    if (password.length < 8) {
      this.scrollToMessageAfterSubmitForm();
      this.setState({ error: 'Password should be at least 8 characters long.' });
      return;
    }

    if(birthday=== '' || joinedDate === '') {
      this.scrollToMessageAfterSubmitForm();
      const errorMsg = birthday === '' ? 'Enter your birth date' : 'Enter your joining date';
      this.setState({ error: errorMsg });
      return;
    }

    this.setState({ loading: true, error: '', success: '' });

    try {
      const response = await axios.post('https://yci26miwxk.execute-api.ap-southeast-1.amazonaws.com/prod/signup', this.state);

      if (response.status === 200 || response.status === 201) {
        this.setState({ success: 'Signup successful.', loading: false });
      } else {
        this.setState({ error: 'Failed to signup.', loading: false });
      }
      this.scrollToMessageAfterSubmitForm();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        this.setState({ error: error.response.data.message });
      } else {
        this.setState({ error: 'An error occurred. Please try again later.' });
      }
      this.setState({ loading: false });
      this.scrollToMessageAfterSubmitForm();
    }
  }

  render() {
    const { loading, error, success } = this.state;

    return (
      <main>
        <section className="d-flex my-5 mt-lg-6 mb-lg-5">
          <Container>
            <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
              <Col xs={12} className="d-flex align-items-center justify-content-center">
                <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-800">
                  <div className="text-center text-md-center mb-4 mt-md-0">
                    <h3 className="mb-0">Create an account</h3>
                  </div>
                  {error && <Alert ref={this.scrollRef} variant="danger">{error}</Alert>}
                  {success && <Alert ref={this.scrollRef} variant="success">{success}</Alert>}
                  <Form className="mt-4" onSubmit={this.onSubmit}>
                    <Form.Group className="mb-4 required">
                      <Form.Label>Your First Name</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faPersonBooth} />
                        </InputGroup.Text>
                        <Form.Control
                          name="firstName"
                          value={this.state.firstName}
                          required
                          type="text"
                          placeholder="First Name"
                          onChange={this.handleInputChange}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-4 required">
                      <Form.Label>Your Last Name</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                        <Form.Control
                          name="lastName"
                          value={this.state.lastName}
                          required
                          type="text"
                          placeholder="Last Name"
                          onChange={this.handleInputChange}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-4 required">
                      <Form.Label>Your Email</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                        <Form.Control
                          name="email"
                          value={this.state.email}
                          required
                          type="email"
                          placeholder="example@company.com"
                          onChange={this.handleInputChange}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-4 required">
                      <Form.Label>Your Contact Number</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                        <Form.Control
                          name="contactNumber"
                          value={this.state.contactNumber}
                          required
                          type="text"
                          placeholder="Contact Number"
                          onChange={this.handleInputChange}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-4 required">
                      <Form.Label>Date of birth</Form.Label>
                      <Datetime
                        timeFormat={false}
                        closeOnSelect={true}
                        onChange={this.changeBirthDate}
                        value={this.state.birthday}
                        inputProps={{
                          name: 'birthday',
                          required: true,
                          placeholder: 'mm/dd/yyyy',
                        }}
                        renderInput={(props, openCalendar) => (
                          <InputGroup onClick={openCalendar}>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faCalendarAlt} />
                            </InputGroup.Text>
                            <Form.Control
                              value={this.state.birthday ? moment(this.state.birthday).format('YYYY-MM-DD') : ''}
                              readOnly
                              required
                            />
                          </InputGroup>
                        )}
                      />
                    </Form.Group>
                    <Form.Group className="mb-4 required">
                      <Form.Label>Enter Address</Form.Label>
                      <Form.Control
                        name="address"
                        value={this.state.address}
                        required
                        as="textarea"
                        rows="4"
                        placeholder="Enter your address..."
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-4 required">
                      <Form.Label>Joined date</Form.Label>
                      <Datetime
                        timeFormat={false}
                        closeOnSelect={true}
                        onChange={this.changeJoiningDate}
                        value={this.state.joinedDate}
                        inputProps={{
                          name: 'joinedDate',
                          required: true,
                          placeholder: 'mm/dd/yyyy',
                        }}
                        renderInput={(props, openCalendar) => (
                          <InputGroup onClick={openCalendar}>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faCalendarAlt} />
                            </InputGroup.Text>
                            <Form.Control
                              value={this.state.joinedDate ? moment(this.state.joinedDate).format('YYYY-MM-DD') : ''}
                              readOnly
                              required
                            />
                          </InputGroup>
                        )}
                      />
                    </Form.Group>
                    <Form.Group className="mb-4 required">
                      <Form.Label>Driving license</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faPersonBooth} />
                        </InputGroup.Text>
                        <Form.Control
                          name="drivingLicence"
                          value={this.state.drivingLicence}
                          required
                          type="text"
                          placeholder="Driving License"
                          onChange={this.handleInputChange}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-4 required">
                      <Form.Label>Car number</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faPersonBooth} />
                        </InputGroup.Text>
                        <Form.Control
                          name="carNumber"
                          value={this.state.carNumber}
                          required
                          type="text"
                          placeholder="Car Number"
                          onChange={this.handleInputChange}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-4 required">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          name="password"
                          value={this.state.password}
                          required
                          type="password"
                          placeholder="Password"
                          onChange={this.handleInputChange}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-4 required">
                      <Form.Label>Confirm Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          name="confirmPassword"
                          value={this.state.confirmPassword}
                          required
                          type="password"
                          placeholder="Confirm Password"
                          onChange={this.handleInputChange}
                        />
                      </InputGroup>
                    </Form.Group>
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
                  <div className="d-flex justify-content-center align-items-center mt-4">
                    <span className="fw-normal">
                      Already have an account?
                      <Card.Link as={Link} to={Routes.Signin.path} className="fw-bold">
                        {' Login here '}
                      </Card.Link>
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    );
  }
}
