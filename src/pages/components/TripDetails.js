import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faDownload, faCheckCircle, faRocket, faTimesCircle, faClock, faTag, faArrowLeft, faLocationArrow, faMapMarkedAlt, faMapMarkerAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card} from '@themesberg/react-bootstrap';
import { Table, ListGroup } from '@themesberg/react-bootstrap';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import moment from 'moment-timezone';

export default () => {
    const [tripData, setTripData] = useState(null);
    const { bookingId, id } = useParams();
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://ec2-54-208-162-205.compute-1.amazonaws.com:8082/tripDetails?tourId=${id}&bookingId=${bookingId}`);
          setTripData(response.data[0]); // Assuming response.data contains user details
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      
  const ItineraryList = (itinerary) => {
    if (itinerary) {
      const itineraryItems = itinerary.split('\n').map((item, index) => (
        <ListGroup.Item key={index}>
          {item.trim().startsWith(`${index + 1}.`) ? item.trim() : `${index + 1}. ${item.trim()}`}
        </ListGroup.Item>
      ));

      return <ListGroup>{itineraryItems}</ListGroup>;
    } else {
      return null;
    }
  };

    return (
        <>
            <Row className="d-flex justify-content-center">
                <Col xl={8}>
                    <Card border="light" className="shadow-sm">
                    {tripData && (
                            <>
                        <Card.Header>
                        <div className="mb-4">
                        <p><Link to="/"><FontAwesomeIcon icon={faArrowLeft} size="md"/></Link></p>
                        </div>
                    <h1 className="fw-bold">Trip details</h1>
                    <p className="lead mb-lg-2 mb-0">
                        <span>{moment(tripData.tourTime, 'HH:mm:ss').format('hh:mm A')},</span>
                        <span className="px-1">{moment(tripData.tourDate).format('dddd')},</span>
                        <span>{moment(tripData.tourDate).format('Do MMMM, YYYY')}</span>
                    </p>
                        </Card.Header>
                      <Card.Body className="py-0">
                    <section class="py-4">
                        <div className="mb-2">
                            {/* <FontAwesomeIcon icon={faClock} /><span className="px-2">{tripData.startLocation}</span> */}
                            <h6>Pickup</h6>
                            <div className="d-flex justify-content-start mt-2">
                                <FontAwesomeIcon icon={faLocationArrow} className="progress-label text-secondary mt-1"/>
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
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="progress-label text-danger mt-1"/>
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
                                <FontAwesomeIcon icon={faClock} className="progress-label text-secondary mt-1"/>
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
                                <FontAwesomeIcon icon={faCalendarAlt} className="progress-label text-danger mt-1"/>
                            <div className="px-2">
                                <p>
                                    {moment(tripData.tourDate).format('Do MMMM, YYYY')}
                                </p>
                            </div>
                            </div>
                        </div>
                    </section>
                    <section class="mb-4 py-4 border-top">
                        <h6 >Itinerary</h6>
                        <div className="mb-2">
                            {ItineraryList(tripData.itinerary)}
                        </div>
                    </section>
                    <section  class="mb-4 py-4 border-top">
                        <h6 className="mb-4">Inclusions</h6>
                        <div className="mb-2">
                            {ItineraryList(tripData.inclusions)}
                        </div>
                        </section>
                        <section  class="mb-4 py-4 border-top">
                        <h6 className="mb-4">Trip charges</h6>
                        <div className="mb-2 d-flex justify-content-between">
                            <span className="fs-30 fw-bold">Fare</span>
                            <span className="fs-30 fw-bold">RM {tripData.fare}</span>
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
