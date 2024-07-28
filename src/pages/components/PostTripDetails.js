import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faArrowLeft, faLocationArrow, faMapMarkerAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card } from '@themesberg/react-bootstrap';
import { Table } from '@themesberg/react-bootstrap';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import moment from 'moment-timezone';

export default () => {
    const [tripData, setTripData] = useState(null);
    const [expensesData, setExpensesData] = useState(null);
    const [expenseAmount, setExpenseAmount] = useState(null);
    const { bookingId, id } = useParams();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://yci26miwxk.execute-api.ap-southeast-1.amazonaws.com/prod/tripEndDetails?tourId=${id}&bookingId=${bookingId}`);
                setTripData(response.data.fetchedTrips[0]); // Assuming response.data contains user details
                setExpensesData(response.data.fetchedExpensesTrips); // Assuming response.data contains user details
                setExpenseAmount(response.data.fetchedExpensesTrips.reduce((total, item) => total + parseFloat(item.amount), 0))
    
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id, bookingId]);

    return (
        <>
            <Row className="d-flex justify-content-center">
                <Col xl={8}>
                    <Card border="light" className="shadow-sm">
                        {tripData && (
                            <>
                                <Card.Header>
                                    <div className="mb-4">
                                        <p><Link to="/"><FontAwesomeIcon icon={faArrowLeft} size="md" /></Link></p>
                                    </div>

                                    <h1 className="fw-bold">Trip details</h1>
                                    <p className="lead mb-lg-2 mb-0">
                                        <span>
                                            {tripData.tourname}
                                        </span>
                                    </p>
                                </Card.Header>
                                <Card.Body className="py-0">
                                    <section class="py-4">
                                        <div className="mb-2">
                                            {/* <FontAwesomeIcon icon={faClock} /><span className="px-2">{tripData.startLocation}</span> */}
                                            <h6>Pickup</h6>
                                            <div className="d-flex justify-content-start mt-2">
                                                <FontAwesomeIcon icon={faLocationArrow} className="progress-label text-secondary mt-1" />
                                                <div className="px-2">
                                                    <p>
                                                        {tripData.startLocation}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-2">
                                            {/* <FontAwesomeIcon icon={faTag} /><span className="px-2">{tripData.endLocation}</span> */}
                                            <h6>Drop point</h6>
                                            <div className="d-flex justify-content-start mt-2">
                                                <FontAwesomeIcon icon={faMapMarkerAlt} className="progress-label text-danger mt-1" />
                                                <div className="px-2">
                                                    <p className="mb-0">
                                                        {tripData.endLocation}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section class="py-4 pb-0 border-top">
                                        <div className="mb-2">
                                            {/* <FontAwesomeIcon icon={faClock} /><span className="px-2">{tripData.startLocation}</span> */}
                                            <h6>Pickup time</h6>
                                            <div className="d-flex justify-content-start mt-2">
                                                <FontAwesomeIcon icon={faClock} className="progress-label text-secondary mt-1" />
                                                <div className="px-2">
                                                    <p>
                                                        {moment(tripData.tourTime, 'HH:mm:ss').format('hh:mm A')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-2">
                                            {/* <FontAwesomeIcon icon={faClock} /><span className="px-2">{tripData.startLocation}</span> */}
                                            <h6>Pickup date</h6>
                                            <div className="d-flex justify-content-start mt-2">
                                                <FontAwesomeIcon icon={faCalendarAlt} className="progress-label text-danger mt-1" />
                                                <div className="px-2">
                                                    <p>
                                                        {moment(tripData.tourDate).format('Do MMMM, YYYY')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section class="mb-4 py-2 px-3 border">
                                        <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center'>
                                            <Table className="justify-content-between align-items-center">
                                                <tbody>
                                                    {expensesData && expensesData.map((item, index) => (
                                                        <tr key={index} className="border-0">
                                                            <td className="px-0 border-0">
                                                                <span className="upperCase-keyword fw-bold">{item.expenseType}</span>
                                                            </td>
                                                            <td className="text-right px-0 border-0">
                                                                RM {item.amount}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    <tr className="border-0">
                                                        <td className="px-0 border-0">
                                                            <span className="upperCase-keyword fw-bold">Tour charges</span>
                                                        </td>
                                                        <td className="text-right px-0 border-0">
                                                            RM {tripData.fare}
                                                        </td>
                                                    </tr>
                                                    <tr className="border-top">
                                                        <td className="px-0 border-0">
                                                            <span className="fs-30 upperCase-keyword fw-bold">Total</span>
                                                        </td>
                                                        <td className="text-right px-0 border-0">
                                                            <span className="fs-30 upperCase-keyword fw-bold">RM {tripData.fare}</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </section>
                                </Card.Body>
                            </>
                        )}
                    </Card>
                </Col>
            </Row>
        </>
    );
};
