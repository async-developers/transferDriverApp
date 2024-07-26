import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLocationArrow, faMapMarkerAlt, faCalendarAlt, faPhone, faPersonBooth, faUser, faUsers, faNotesMedical, faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Card } from '@themesberg/react-bootstrap';
import { ListGroup } from '@themesberg/react-bootstrap';
import moment from 'moment-timezone';

export default (tripData) => {

    const ItineraryList = (itinerary) => {
        if (itinerary) {
            const itineraryItems = itinerary
                .split('\n')
                .map((item, index) => {
                    const trimmedItem = item.trim();
                    if (trimmedItem.startsWith(`${index + 1}.`)) {
                        return (
                            <ListGroup.Item key={index}>
                                {trimmedItem}
                            </ListGroup.Item>
                        );
                    }
                    return null; // Return null for items that don't match the expected format
                })
                .filter(item => item); // Filter out null items
    
            return <ListGroup>{itineraryItems}</ListGroup>;
        } else {
            return null;
        }
    };
    

    return (
        <>
            <Card.Body className="py-0">
            <section class="py-4">
                    <div className="mb-2">
                        {/* <FontAwesomeIcon icon={faClock} /><span className="px-2">{tripData.startLocation}</span> */}
                        <h6>Guest Name</h6>
                        <div className="d-flex justify-content-start mt-2">
                            <FontAwesomeIcon icon={faUser} className="progress-label text-secondary mt-1" />
                            <div className="px-2">
                                <p className="fw-bold">
                                    {tripData.fullName}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-2">
                        {/* <FontAwesomeIcon icon={faTag} /><span className="px-2">{tripData.endLocation}</span> */}
                        <h6>Contact Number</h6>
                        <div className="d-flex justify-content-start mt-2">
                            <FontAwesomeIcon icon={faPhone} className="progress-label text-danger mt-1" />
                            <div className="px-2">
                                <p>
                                    {tripData.phone}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-2">
                        {/* <FontAwesomeIcon icon={faTag} /><span className="px-2">{tripData.endLocation}</span> */}
                        <h6># of pax</h6>
                        <div className="d-flex justify-content-start mt-2">
                            <FontAwesomeIcon icon={faUsers} className="progress-label text-danger mt-1" />
                            <div className="px-2">
                                <p className="mb-0">
                                    {tripData.pax}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="py-4 pb-0 border-top">
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
                <section class="py-4 border-top">
                    <h6 >Itinerary</h6>
                    <div className="mb-2">
                        {ItineraryList(tripData.itinerary)}
                    </div>
                </section>
                <section class="py-4 border-top">
                    <h6 className="mb-4">Inclusions</h6>
                    <div className="mb-2">
                        {ItineraryList(tripData.inclusions)}
                    </div>
                </section>
                <section class="py-4 pb-0 border-top">
                    <div className="mb-2">
                        {/* <FontAwesomeIcon icon={faClock} /><span className="px-2">{tripData.startLocation}</span> */}
                        <h6>Remarks</h6>
                        <div className="d-flex justify-content-start mt-2">
                            <FontAwesomeIcon icon={faInfoCircle} className="progress-label text-secondary mt-1" />
                            <div className="px-2">
                                <p>
                                    {tripData.remarks}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="mb-4 py-4 border-top">
                    <h6 className="mb-4">Trip charges</h6>
                    <div className="mb-2 d-flex justify-content-between">
                        <span className="fs-30 fw-bold">Fare</span>
                        <span className="fs-30 fw-bold">RM {tripData.fare}</span>
                    </div>
                </section>
            </Card.Body>
        </>
    );
};
