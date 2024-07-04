import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Breadcrumb, Form, Button } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEdit, faSave, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import moment from 'moment-timezone';

const ProfilePage = ({ userData }) => {
  console.log(userData)
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    contactNumber: '',
    address: '',
    joinDate: '',
    approvalStatus: '',
    driverLicence: '',
    validUntil: '',
    carNumber: '',
    carModel: ''
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchUserData();
    console.log(user)
    setFormData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      birthDate: moment(userData.birthDate).format('DD-MM-YYYY'),
      email: userData.email,
      contactNumber: userData.contactNumber,
      address: userData.address,
      joinDate: moment(userData.joiningDate).format('DD-MM-YYYY'),
      approvalStatus: userData.approvalStatus || "approved",
      driverLicence: userData.driverLicence,
      validUntil: userData.validUntil,
      carNumber: userData.carNumber,
      carModel: userData.carModel
    });
  }, [userData]);

  const fetchUserData = async () => {
    try {
      const response = await axios.post('http://ec2-54-208-162-205.compute-1.amazonaws.com:8082/fetchProfile', userData);
      setUser(response.data); // Assuming response.data contains user details
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://ec2-54-208-162-205.compute-1.amazonaws.com:8082/updateProfile', formData);
      setUser(response.data); // Assuming response.data contains updated user details
      setEditMode(false); // Exit edit mode after successful update
      console.log('Profile updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error state or show error message
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // If user data is not yet fetched, show loading or handle accordingly
  if (!user) {
    return <p>Loading...</p>; // You can customize loading indicator as per your design
  }

  return (
    <div>
      <Row className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Profile</Breadcrumb.Item>
          </Breadcrumb>
          <h4>My Profile</h4>
          <p className="mb-0">Your important information.</p>
        </div>
      </Row>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          {!editMode && (
            <Button variant="primary" className="text-dark me-2 dropdown-toggle btn btn-secondary" onClick={toggleEditMode}>
              <FontAwesomeIcon icon={faEdit} /> Edit
            </Button>
          )}
        </div>
      <Row>
        <Col xs={12} md={8} className="mt-1">
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Header className='border-bottom'>
              <h5 className="mb-0">General information</h5>
            </Card.Header>
            <Card.Body>
              {!editMode ? (
                <>
                  <Row>
                    <Col xs={6} className="mb-3">
                      <div id="firstName">
                        <p className='mb-2 upperCase-keyword'><strong>First Name</strong></p>
                        <p className="text-muted mb-2 upperCase-keyword">{user.firstName}</p>
                      </div>
                    </Col>
                    <Col xs={6} className="mb-3">
                      <div id="lastName">
                        <p className='mb-2 upperCase-keyword'><strong>Last Name</strong></p>
                        <p className="text-muted mb-2 upperCase-keyword">{user.lastName}</p>
                      </div>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6}>
                      <div id="birthday">
                        <p className='mb-2 upperCase-keyword'><strong>Date of Birth</strong></p>
                        <p className="text-muted mb-2 upperCase-keyword">{moment(user.birthDate).format('DD-MM-YYYY')}</p>
                      </div>
                    </Col>
                    {/* <Col xs={6}>
                      <div id="dateOfJoining">
                        <p className='mb-2 upperCase-keyword'><strong>Date of Joining</strong></p>
                        <p className="text-muted mb-2 upperCase-keyword">{moment(user.joiningDate).format('YYYY-MM-DD')}</p>
                      </div>
                    </Col> */}
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6}>
                      <div id="email">
                        <p className='mb-2 upperCase-keyword'><strong>Email</strong></p>
                        <p className="text-muted mb-2 upperCase-keyword">{user.email}</p>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div id="phone">
                        <p className='mb-2 upperCase-keyword'><strong>Phone</strong></p>
                        <p className="text-muted mb-2 upperCase-keyword">{user.contactNumber}</p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <div id="address">
                        <p className='mb-2 upperCase-keyword'><strong>Address</strong></p>
                        <p className="text-muted mb-2 upperCase-keyword">{user.address}</p>
                      </div>
                    </Col>
                  </Row>
                </>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col xs={6} className="mb-3">
                      <Form.Group id="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={6} className="mb-3">
                      <Form.Group id="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6}>
                      <Form.Group id="birthDate">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                          type="date"
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={6}>
                      <Form.Group id="joinDate">
                        <Form.Label>Date of Joining</Form.Label>
                        <Form.Control
                          type="date"
                          name="joinDate"
                          value={formData.joinDate}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6}>
                      <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={6}>
                      <Form.Group id="contactNumber">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="text"
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={12}>
                      <Form.Group id="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit"><FontAwesomeIcon icon={faSave} className="me-2" /> Save Changes</Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4} className="mt-1">
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Header className='border-bottom'>
              <h5 className="mb-0">Employment information</h5>
            </Card.Header>
            <Card.Body>
              {!editMode ? (
                <>
                  <div className="mb-3">
                    <div id="joinDate">
                      <p className='mb-2 upperCase-keyword'><strong>Join Date</strong></p>
                      <p className="text-muted mb-2 upperCase-keyword fw-bold text-success">{moment(user.joiningDate).format("DD-MM-YYYY")}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div id="approvalStatus">
                      <p className='mb-2 upperCase-keyword'><strong>Approval Status</strong></p>
                      <p className="text-muted mb-2 upperCase-keyword fw-bold text-success">approved</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Row className="mb-3">
                    <Col xs={12}>
                      <Form.Group id="joinDate">
                        <Form.Label>Join Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="joinDate"
                          value={formData.joinDate}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                      </Col>
                      </Row>
                      <Row className='mb-3'>
                      <Col xs={12}>
                        <Form.Group id="approvalStatus">
                          <Form.Label>Approval Status</Form.Label>
                          <Form.Control
                            type="text"
                            name="approvalStatus"
                            value={formData.approvalStatus}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                </>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Header className='border-bottom'>
              <h5 className="mb-0">Driver information</h5>
            </Card.Header>
            <Card.Body>
              {!editMode ? (
                <>
                  <Row className="mb-3">
                    <Col xs={6}>
                      <div id="drivingLicence">
                        <p className='mb-2 upperCase-keyword'><strong>License No.</strong></p>
                        <p className="text-muted mb-2 upperCase-keyword">{user.driverLicence}</p>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div id="validUntil">
                        <p className='mb-2 upperCase-keyword'><strong>Valid until</strong></p>
                        <p className="text-muted mb-2 upperCase-keyword">--</p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6}>
                      <div id="carNumber">
                        <p className='mb-2 upperCase-keyword'><strong>Car Number</strong></p>
                        <p className="text-muted mb-2 upperCase-keyword">{user.carNumber}</p>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div id="carModel">
                        <p className='mb-2 upperCase-keyword'><strong>Car Model</strong></p>
                        <p className="text-muted mb-2 upperCase-keyword">--</p>
                      </div>
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <Row className="mb-3">
                    <Col xs={12}>
                      <Form.Group id="drivingLicence">
                        <Form.Label>License No.</Form.Label>
                        <Form.Control
                          type="text"
                          name="driverLicence"
                          value={formData.driverLicence}
                          onChange={handleInputChange}
                          required
                        />
                        </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={12}>
                      <Form.Group id="validUntil">
                        <Form.Label>Valid until</Form.Label>
                        <Form.Control
                          type="date"
                          name="validUntil"
                          value={formData.validUntil}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                      </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col xs={12}>
                          <Form.Group id="carNumber">
                            <Form.Label>Car Number</Form.Label>
                            <Form.Control
                              type="text"
                              name="carNumber"
                              value={formData.carNumber}
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col xs={12}>
                          <Form.Group id="carModel">
                            <Form.Label>Car Model</Form.Label>
                            <Form.Control
                              type="text"
                              name="carModel"
                              value={formData.carModel}
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                          </Col>
                          </Row>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
