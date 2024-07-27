import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card } from '@themesberg/react-bootstrap';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';
import TripInformation from "../subComponents/TripInformation";

const TripDetails = () => {
    const [tripData, setTripData] = useState(null);
    const { bookingId, id } = useParams();
    const history = useHistory(); // Access to the history object

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://yci26miwxk.execute-api.ap-southeast-1.amazonaws.com/prod/tripDetails?tourId=${id}&bookingId=${bookingId}`);
                setTripData(response.data[0]); // Assuming response.data contains trip details
            } catch (error) {
                console.error('Error fetching trip data:', error);
            }
        };
        
        fetchUserData();
    }, []);

    return (
        <>
            <Row className="d-flex justify-content-center">
                <Col xl={8}>
                    <Card border="light" className="shadow-sm">
                        {tripData && (
                            <>
                                <Card.Header>
                                    <div className="mb-4">
                                        <p onClick={() => history.goBack()} style={{ cursor: 'pointer' }}>
                                            <FontAwesomeIcon icon={faArrowLeft} size="md" />
                                        </p>
                                    </div>
                                    <h1 className="fw-bold">Trip details</h1>
                                    <p className="lead mb-lg-2 mb-0">
                                        <span>
                                            {tripData.tourname}
                                        </span>    
                                    </p>
                                </Card.Header>
                                {TripInformation(tripData)}
                            </>
                        )}
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default TripDetails;
