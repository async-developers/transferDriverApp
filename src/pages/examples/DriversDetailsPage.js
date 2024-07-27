import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table } from '@themesberg/react-bootstrap';
import axios from 'axios';
import moment from 'moment-timezone';

const DriverDetailsPage = ({ driver }) => {
  const [driverProfileData, setDriverProfile] = useState({});
  const [driverData, setDriverData] = useState([]);

  useEffect(() => {
    if (!driver) return;
    
    axios.get(`https://yci26miwxk.execute-api.ap-southeast-1.amazonaws.com/prod/fetchDriversById?id=${driver.driverId}`)
      .then((driverDetailsRes) => {
        setDriverData(driverDetailsRes.data);
        setDriverProfile(driverDetailsRes.data[0]);
      })
      .catch(error => {
        console.error('Error fetching driver details:', error);
      });
  }, [driver]);

  return (
    <>
      {driverProfileData && (
        <>
          <Row>
            <Col xs={12} className="p-3">
              <h2>Driver Details</h2>
              <Card>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <p><strong>First Name:</strong> <span className="upperCase-keyword">{driverProfileData.firstName}</span></p>
                      <p><strong>Last Name:</strong> <span className="upperCase-keyword">{driverProfileData.lastName}</span></p>
                      <p><strong>License Number:</strong> {driverProfileData.driverLicence}</p>
                      <p><strong>Phone Number:</strong> {driverProfileData.contactNumber}</p>
                      <p><strong>Email:</strong> {driverProfileData.email}</p>
                      <p><strong>Joining Date:</strong> {moment(driverProfileData.joiningDate).format('Do MMMM, YYYY')}</p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs={12} className="p-3">
              <h2>Ride History</h2>
              <Card>
                <Card.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Start Location</th>
                        <th>End Location</th>
                        <th>Fare</th>
                      </tr>
                    </thead>
                    <tbody>
                      {driverData.map(ride => (
                        <tr key={ride.tourId}>
                          <td>{moment(ride.tourDate).format('YYYY-MM-DD')}</td>
                          <td>{ride.startLocation}</td>
                          <td>{ride.endLocation}</td>
                          <td>${ride.fare}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs={12} className="p-3">
              <h2>Added Expenses</h2>
              <Card>
                <Card.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {driverData.map(expense => (
                        <tr key={expense.expenseId}>
                          <td>{moment(expense.expenseDate).format('YYYY-MM-DD')}</td>
                          <td>{expense.expenseType}</td>
                          <td>${expense.expenseAmount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default DriverDetailsPage;
