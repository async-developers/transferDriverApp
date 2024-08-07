
import React,{useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faChartArea, faChartBar, faChartLine, faFlagUsa, faFolderOpen, faGlobeEurope, faPaperclip, faUserPlus, faPlus, faInfo, faList, faListAlt, faClipboardCheck, faClipboard, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { faAngular, faBootstrap, faReact, faVuejs } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Card, Image, Button, ListGroup, ProgressBar, Modal, Form } from '@themesberg/react-bootstrap';
import { CircleChart, BarChart, SalesValueChart, SalesValueChartphone } from "./Charts";

import Profile1 from "../assets/img/team/profile-picture-1.jpg";
import ProfileCover from "../assets/img/profile-cover.jpg";
import moment from "moment-timezone";
import { Link } from "react-router-dom";
import axios from "axios";

export const ProfileCardWidget = () => {
  return (
    <Card border="light" className="text-center p-0 mb-4">
      <div style={{ backgroundImage: `url(${ProfileCover})` }} className="profile-cover rounded-top" />
      <Card.Body className="pb-5">
        <Card.Img src={Profile1} alt="Neil Portrait" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" />
        <Card.Title>Neil Sims</Card.Title>
        <Card.Subtitle className="fw-normal">Senior Software Engineer</Card.Subtitle>
        <Card.Text className="text-gray mb-4">New York, USA</Card.Text>

        <Button variant="primary" size="sm" className="me-2">
          <FontAwesomeIcon icon={faUserPlus} className="me-1" /> Connect
        </Button>
        <Button variant="secondary" size="sm">Send Message</Button>
      </Card.Body>
    </Card>
  );
};

export const ChoosePhotoWidget = (props) => {
  const { title, photo } = props;

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">{title}</h5>
        <div className="d-xl-flex align-items-center">
          <div className="user-avatar xl-avatar">
            <Image fluid rounded src={photo} />
          </div>
          <div className="file-field">
            <div className="d-flex justify-content-xl-center ms-xl-3">
              <div className="d-flex">
                <span className="icon icon-md">
                  <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                </span>
                <input type="file" />
                <div className="d-md-block text-start">
                  <div className="fw-normal text-dark mb-1">Choose Image</div>
                  <div className="text-gray small">JPG, GIF or PNG. Max size of 800K</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export const OngoingTripsWidget = (props) => {
  const { tourId, bookingId, title, pickUpDate, pickUpTime, fare, pickUpPoint, dropPoint, status } = props;

  const [tripStatus, setTripStatus] = useState(status);
  useEffect(() => {
    setTripStatus(status);
  }, [status]);
  console.log(tripStatus)
  const handleStartTrip = async () => {
    try {
      await axios.put(`http://ec2-54-208-162-205.compute-1.amazonaws.com:8082/tours/${bookingId}/status`, {
        status: "inProgress"
      });
      setTripStatus('inProgress');
    }
    catch(err){
      console.error('Error starting trip:', err);
    }
  };

  const handleEndTrip = async () => {
    try {
      await axios.put(`http://ec2-54-208-162-205.compute-1.amazonaws.com:8082/tours/${bookingId}/status`, {
        status: "completed"
      });
      setTripStatus('completed');
    }
    catch(err){
      console.error('Error starting trip:', err);
    }
  };

  return (
    <Row className="d-block d-xl-flex align-items-center upperCase-keyword">
      <Col xl={5} md={12} className="text-xl-center d-flex align-items-center justify-content-xl-center mb-xl-0">
        <div>
          <h5 className="mb-1">{title}</h5>
          <div>
            <span className="card-subtitle">
              {moment(pickUpDate).format('Do MMMM, YYYY')} {moment(pickUpTime, 'HH:mm:ss').format('hh:mm A')}
            </span>
          </div>
          <div className="small">
            <span className="fw-bold upperCase-keyword text-success">Pickup: </span>
            <small>{pickUpPoint}</small>
          </div>
          <div className="small">
            <span className="fw-bold upperCase-keyword text-warning">Drop: </span>
            <small>{dropPoint}</small>
          </div>
          <div>
            <span className="card-subtitle">RM {fare}</span>
            </div>
            <div>
            <span className="card-subtitle">{tripStatus}</span>
          </div>

          <div className="d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center mt-2">
            <Link to={`/trip-details/${bookingId}/${tourId}`}>
              <Button variant="outline-primary" size="sm" className="btn upperCase-keyword mx-1">
                Details
              </Button>
            </Link>
            {tripStatus === 'pending' && (
              <Button variant="primary" size="sm" className="btn upperCase-keyword mx-1" onClick={handleStartTrip}>
                Start Trip
              </Button>
            )}
            {tripStatus === 'inProgress' && (
              <Button variant="warning" size="sm" className="btn upperCase-keyword mx-1" onClick={handleEndTrip}>
                End Trip
              </Button>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
};





export const CounterWidget = (props) => {
  const { tourId, bookingId, icon, iconColor, title, pickUpDate, pickUpTime, fare, pickUpPoint, dropPoint, status } = props;

  return (
    <Card border="light" className="shadow-sm upperCase-keyword">
      <Card.Body>
        <div className="timecounter">

        </div>
        <Row className="d-block d-xl-flex align-items-center">
          <Col xl={5} md={12} className="text-xl-center d-flex align-items-center justify-content-xl-center mb-xl-0">
            <div className={`icon icon-shape icon-md icon-${iconColor} rounded me-4 me-sm-0 taxi-color-size`}>
              <FontAwesomeIcon icon={icon} className="taxi-color-size" />
            </div>
            <div>
              <h5 className="mb-1">{title}</h5>
              <div >
                <span className="card-subtitle">{moment(pickUpDate).format('Do MMMM, YYYY')} {moment(pickUpTime, 'HH:mm:ss').format('hh:mm A')}</span>
                </div>
                <div className="small">
              <span className="fw-bold upperCase-keyword text-success">Pickup: </span>
              <small>{pickUpPoint}</small>
            </div>
            <div className="small">
              <span className="fw-bold upperCase-keyword text-warning">Drop: </span>
              <small>{dropPoint}</small> 
            </div>
                <div>
                <span className="card-subtitle">RM { fare }</span>
                </div>
                <div>
                <span className="card-subtitle">{ status }</span>
                </div>
            </div>
          </Col>
        </Row>
        <div className="d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center mt-2">
          <Link to={`/trip-details/${bookingId}/${tourId}`}>
          <Button variant="primary" size="sm" className="me-2 upperCase-keyword">
                <FontAwesomeIcon icon={faClipboardList} className="me-2" />details
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export const CabHistoryWidget = (props) => {
  const {tourId, bookingId, title, pickUpDate, pickUpTime, pickUpPoint, dropPoint, fare, icon, status, iconColor } = props;
  const [expenseType, setExpenseType] = useState('');
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState('');
 
  const handleExpenseTypeChange = (e) => {
    setExpenseType(e.target.value);
  };

  const handleAddExpense = () => {
    setShowAddExpenseModal(true);
  };

  const handleAddExpenseSubmit = async () => {
    try {
      await axios.put(`http://ec2-54-208-162-205.compute-1.amazonaws.com:8082/addExpense/${tourId}`, {
        expenseAmount,
        expenseType
      });
      setShowAddExpenseModal(false);
      // fetchTours(); // Refresh tour list after adding expense
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleCloseAddExpenseModal = () => {
    setShowAddExpenseModal(false);
    setExpenseAmount('');
  };

  return (
    <>
    <Card border="light" className="shadow-sm upperCase-keyword">
      <Card.Body>
        <Row className="d-block">
          <Col xl={12} className="text-xl-center d-flex align-items-center justify-content-xl-center mb-xl-0">
            <div className={`icon icon-shape icon-md icon-${iconColor} rounded me-4 me-sm-0 `}>
              <FontAwesomeIcon icon={icon} className="taxi-color-size"/>
            </div>
            <div>
              <h5 className="mb-2">{title}</h5>
              <div >
                <span className="card-subtitle">{moment(pickUpDate).format('Do MMMM, YYYY')} {moment(pickUpTime, 'HH:mm:ss').format('hh:mm A')}</span>
                </div>
                <div className="small">
              <span className="fw-bold text-success">Pickup: </span>
              <small>{pickUpPoint}</small>
            </div>
            <div className="small">
              <span className="fw-bold text-warning">Drop: </span>
              <small>{dropPoint}</small> 
            </div>
                <div>
                <span className="card-subtitle">RM { fare }</span>
                <span variant="primary" size="sm" className="me-2 card-subtitle px-2 text-warning upperCase-keyword">{ status === "pending" ? "cancelled": "completed" }</span>
            </div>
            </div>
          </Col>
        </Row>
        <div className="d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center mt-2">
            <Link to={`/trip-end-details/${bookingId}/${tourId}`}>
            <Button variant="primary" size="sm" className="me-2 upperCase-keyword">
                <FontAwesomeIcon icon={faClipboardList} className="me-2" />details
            </Button>
            </Link>
          <Button variant="warning" size="sm" className="me-2 upperCase-keyword">
                <FontAwesomeIcon icon={faPlus} className="me-2" />expense
            </Button>
            </div>
      </Card.Body>
    </Card>
    {/* Add Expense Modal */}
    <Modal as={Modal.Dialog} centered show={showAddExpenseModal} onHide={handleCloseAddExpenseModal} dialogClassName="drawer-modal">
    <Modal.Header>
      <Modal.Title>Add Expense</Modal.Title>
      <Button variant="close" aria-label="Close" onClick={handleCloseAddExpenseModal} />
    </Modal.Header>
    <Modal.Body>
      <Form.Group className="mb-3">
        <Form.Label>Expense Type</Form.Label>
        <Form.Select value={expenseType} onChange={handleExpenseTypeChange}>
          <option>Select Expense Type</option>
          <option value="fuel">Petrol Fee</option>
          <option value="parking">Parking Charges</option>
          <option value="toll">Toll Tax</option>
          {/* Add more expense types as needed */}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Expense Amount:</Form.Label>
        <Form.Control type="number" value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} />
      </Form.Group>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseAddExpenseModal}>
        Close
      </Button>
      <Button variant="primary" onClick={handleAddExpenseSubmit}>
        Add Expense
      </Button>
    </Modal.Footer>
  </Modal>
  </>
  );
};

export const ToursWidgetWithoutIcon = (props) => {
  const {title, pickUpDate, pickUpTime, pickUpPoint, dropPoint, fare, icon, status, iconColor } = props;

  return (
    // <Card border="light" className="shadow-sm upperCase-keyword">
    //   <Card.Body>
        <Row className="d-block">
          <Col xl={5} className="text-xl-center d-flex align-items-center justify-content-xl-center mb-xl-0">
            <div>
              <h5 className="mb-2 word-elipsis upperCase-keyword">{title}</h5>
              <div >
                <span className="card-subtitle">{moment(pickUpDate).format('Do MMMM, YYYY')} {moment(pickUpTime, 'HH:mm:ss').format('hh:mm A')}</span>
                </div>
                <div className="small">
              <span className="fw-bold text-success">Pickup: </span>
              <small>{pickUpPoint}</small>
            </div>
            <div className="small">
              <span className="fw-bold text-warning">Drop: </span>
              <small>{dropPoint}</small> 
            </div>
                <div className="mt-2">
                <span className="card-subtitle">RM { fare }</span>
                <span variant="primary" size="sm" className="me-2 card-subtitle px-2 text-warning upperCase-keyword">{ status }</span>
            </div>
            </div>
          </Col>
        </Row>
    //   </Card.Body>
    // </Card>
  );
};


export const CircleChartWidget = (props) => {
  const { title, data = [] } = props;
  const series = data.map(d => d.value);

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <Row className="d-block d-xl-flex align-items-center">
          <Col xs={12} xl={5} className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0">
            <CircleChart series={series} />
          </Col>
          <Col xs={12} xl={7} className="px-xl-0">
            <h5 className="mb-3">{title}</h5>

            {data.map(d => (
              <h6 key={`circle-element-${d.id}`} className="fw-normal text-gray">
                <FontAwesomeIcon icon={d.icon} className={`icon icon-xs text-${d.color} w-20 me-1`} />
                {` ${d.label} `}{`${d.value}%`}
              </h6>
            ))}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export const BarChartWidget = (props) => {
  const { title, value, percentage, data = [] } = props;
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const series = data.map(d => d.value);
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="d-flex flex-row align-items-center flex-0 border-bottom">
        <div className="d-block">
          <h6 className="fw-normal text-gray mb-2">{title}</h6>
          <h3>{value}</h3>
          <small className="mt-2">
            <FontAwesomeIcon icon={percentageIcon} className={`${percentageColor} me-1`} />
            <span className={`${percentageColor} fw-bold`}>
              {percentage}%
            </span>
          </small>
        </div>
        <div className="d-block ms-auto">
          {data.map(d => (
            <div key={`bar-element-${d.id}`} className="d-flex align-items-center text-end mb-2">
              <span className={`shape-xs rounded-circle bg-${d.color} me-2`} />
              <small className="fw-normal">{d.label}</small>
            </div>
          ))}
        </div>
      </Card.Body>
      <Card.Body className="p-2">
        <BarChart labels={labels} series={series} />
      </Card.Body>
    </Card>
  );
};

export const TeamMembersWidget = () => {
  const TeamMember = (props) => {
    const { name, statusKey, image, icon, btnText } = props;
    const status = {
      online: { color: "success", label: "Online" },
      inMeeting: { color: "warning", label: "In a meeting" },
      offline: { color: "danger", label: "Offline" }
    };

    const statusColor = status[statusKey] ? status[statusKey].color : 'danger'
      , statusLabel = status[statusKey] ? status[statusKey].label : 'Offline';

    return (
      <ListGroup.Item className="px-0">
        <Row className="align-items-center">
          <Col className="col-auto">
            <a href="#top" className="user-avatar">
              <Image src={image} className="rounded-circle" />
            </a>
          </Col>
          <Col className="ms--2">
            <h4 className="h6 mb-0">
              <a href="#!">{name}</a>
            </h4>
            <span className={`text-${statusColor}`}>● </span>
            <small>{statusLabel}</small>
          </Col>
          <Col className="col-auto">
            <Button variant="tertiary" size="sm">
              <FontAwesomeIcon icon={icon} className="me-1" /> {btnText}
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light d-flex justify-content-between">
        <h5 className="mb-0">Recent Activities</h5>
        <Button variant="secondary" size="sm">See all</Button>
      </Card.Header>
      <Card.Body>
        <ListGroup className="list-group-flush list my--3">
          {/* {teamMembers.map(tm => <TeamMember key={`team-member-${tm.id}`} {...tm} />)} */}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export const ProgressTrackWidget = () => {
  const Progress = (props) => {
    const { title, percentage, icon, color, last = false } = props;
    const extraClassName = last ? "" : "mb-2";

    return (
      <Row className={`align-items-center ${extraClassName}`}>
        <Col xs="auto">
          <span className={`icon icon-md text-${color}`}>
            <FontAwesomeIcon icon={icon} className="me-1" />
          </span>
        </Col>
        <Col>
          <div className="progress-wrapper">
            <div className="progress-info">
              <h6 className="mb-0">{title}</h6>
              <small className="fw-bold text-dark">
                <span>{percentage} %</span>
              </small>
            </div>
            <ProgressBar variant={color} now={percentage} min={0} max={100} />
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light">
        <h5 className="mb-0">Progress track</h5>
      </Card.Header>
      <Card.Body>

        <Progress title="Rocket - SaaS Template" color="purple" icon={faBootstrap} percentage={34} />
        <Progress title="Pixel - Design System" color="danger" icon={faAngular} percentage={60} />
        <Progress title="Spaces - Listings Template" color="tertiary" icon={faVuejs} percentage={45} />
        <Progress title="Stellar - Dashboard" color="info" icon={faReact} percentage={35} />
        <Progress last title="Volt - Dashboard" color="purple" icon={faBootstrap} percentage={34} />
      </Card.Body>
    </Card>
  );
};

export const RankingWidget = () => {
  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light pb-3">
          <div>
            <h6><FontAwesomeIcon icon={faGlobeEurope} className="icon icon-xs me-3" /> Global Rank</h6>
          </div>
          <div>
            <Card.Link href="#" className="text-primary fw-bold">
              #755 <FontAwesomeIcon icon={faChartLine} className="ms-2" />
            </Card.Link>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light py-3">
          <div>
            <h6 className="mb-0"><FontAwesomeIcon icon={faFlagUsa} className="icon icon-xs me-3" />Country Rank</h6>
            <div className="small card-stats">
              United States <FontAwesomeIcon icon={faAngleUp} className="icon icon-xs text-success ms-2" />
            </div>
          </div>
          <div>
            <Card.Link href="#top" className="text-primary fw-bold">
              #32 <FontAwesomeIcon icon={faChartLine} className="ms-2" />
            </Card.Link>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between pt-3">
          <div>
            <h6 className="mb-0"><FontAwesomeIcon icon={faFolderOpen} className="icon icon-xs me-3" />Category Rank</h6>
            <Card.Link href="#top" className="small card-stats">
              Travel &gt; Accomodation
            </Card.Link>
          </div>
          <div>
            <Card.Link href="#top" className="text-primary fw-bold">
              #16 <FontAwesomeIcon icon={faChartLine} className="ms-2" />
            </Card.Link>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export const SalesValueWidget = (props) => {
  const { title, value, percentage } = props;
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";

  return (
    <Card className="bg-secondary-alt shadow-sm">
      <Card.Header className="d-flex flex-row align-items-center flex-0">
        <div className="d-block">
          <h5 className="fw-normal mb-2">
            {title}
          </h5>
          <h3>${value}</h3>
          <small className="fw-bold mt-2">
            <span className="me-2">Yesterday</span>
            <FontAwesomeIcon icon={percentageIcon} className={`${percentageColor} me-1`} />
            <span className={percentageColor}>
              {percentage}%
            </span>
          </small>
        </div>
        <div className="d-flex ms-auto">
          <Button variant="secondary" size="sm" className="me-2">Month</Button>
          <Button variant="primary" size="sm" className="me-3">Week</Button>
        </div>
      </Card.Header>
      <Card.Body className="p-2">
        <SalesValueChart />
      </Card.Body>
    </Card>
  );
};

export const SalesValueWidgetPhone = (props) => {
  const { title, value, percentage } = props;
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";

  return (
    <Card className="bg-secondary-alt shadow-sm">
      <Card.Header className="d-md-flex flex-row align-items-center flex-0">
        <div className="d-block mb-3 mb-md-0">
          <h5 className="fw-normal mb-2">
            {title}
          </h5>
          <h3>${value}</h3>
          <small className="fw-bold mt-2">
            <span className="me-2">Yesterday</span>
            <FontAwesomeIcon icon={percentageIcon} className={`${percentageColor} me-1`} />
            <span className={percentageColor}>
              {percentage}%
            </span>
          </small>
        </div>
        <div className="d-flex ms-auto">
          <Button variant="secondary" size="sm" className="me-2">Month</Button>
          <Button variant="primary" size="sm" className="me-3">Week</Button>
        </div>
      </Card.Header>
      <Card.Body className="p-2">
        <SalesValueChartphone />
      </Card.Body>
    </Card>
  );
};

export const AcquisitionWidget = () => {
  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <h5>Acquisition</h5>
        <p>Tells you where your visitors originated from, such as search engines, social networks or website referrals.</p>
        <div className="d-block">
          <div className="d-flex align-items-center pt-3 me-5">
            <div className="icon icon-shape icon-sm icon-shape-danger rounded me-3">
              <FontAwesomeIcon icon={faChartBar} />
            </div>
            <div className="d-block">
              <label className="mb-0">Bounce Rate</label>
              <h4 className="mb-0">33.50%</h4>
            </div>
          </div>
          <div className="d-flex align-items-center pt-3">
            <div className="icon icon-shape icon-sm icon-shape-quaternary rounded me-3">
              <FontAwesomeIcon icon={faChartArea} />
            </div>
            <div className="d-block">
              <label className="mb-0">Sessions</label>
              <h4 className="mb-0">9,567</h4>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
