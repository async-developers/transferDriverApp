import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faDownload, faCheckCircle, faRocket, faTimesCircle, faClock, faTag, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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
                        <div className="mb-6">
                        <p><Link to="/"><FontAwesomeIcon icon={faArrowLeft} size="md"/></Link></p>
                        </div>
                    <h1 className="text-center fw-bold">Trip details</h1>
                    <p className="lead mb-lg-2 mb-0">
                        <span>{moment(tripData.tourTime, 'HH:mm:ss').format('hh:mm A')},</span>
                        <span className="px-2">{moment(tripData.tourDate).format('dddd')},</span>
                        <span className="px-2">{moment(tripData.tourDate).format('Do MMMM, YYYY')}</span>
                    </p>
                        </Card.Header>
                      <Card.Body>
                    <section class="mb-4 py-4 pt-0 border-bottom">
                        <h4 className="mb-4">Trip details</h4>
                        <div className="mb-2">
                            <FontAwesomeIcon icon={faClock} / ><span className="px-2">{moment(tripData.tourTime, 'HH:mm:ss').format('hh:mm A')}</span>
                        </div>
                        <div className="mb-2">
                            <FontAwesomeIcon icon={faTag} /><span className="px-2">RM {tripData.fare}</span>
                        </div>
                    </section>
                    <section class="mb-4 py-4 pt-0 border-bottom">
                        <h4 className="mb-4">Customer Details</h4>
                        <div className="mb-2">
                            <FontAwesomeIcon icon={faClock} / ><span className="px-2">{tripData.fullName}</span>
                        </div>
                        <div className="mb-2">
                            <FontAwesomeIcon icon={faTag} /><span className="px-2">{tripData.phone}</span>
                        </div>
                    </section>
                    <section class="mb-4 py-4 pt-0 border-bottom">
                        <h4  className="mb-4">Route</h4>
                        <div className="mb-2">
                            <FontAwesomeIcon icon={faClock} /><span className="px-2">{tripData.startLocation}</span>
                        </div>
                        <div className="mb-2">
                            <FontAwesomeIcon icon={faTag} /><span className="px-2">{tripData.endLocation}</span>
                        </div>
                    </section>
                    <section class="mb-4 py-4 pt-0 border-bottom">
                        <h4  className="mb-4">Itinerary</h4>
                        <div className="mb-2">
                            {ItineraryList(tripData.itinerary)}
                        </div>
                    </section>
                    <section>
                        <h4 className="mb-4">Inclusions</h4>
                        <div className="mb-2">
                            {ItineraryList(tripData.inclusions)}
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
