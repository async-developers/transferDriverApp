import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';

import { RidesHistory } from "../components/Tables";
import TourList from "./examples/TourList";
import TourListHistory from "./examples/TourListHistory";
import AllDrivers from "./examples/AllDrivers";

export default () => {
  return (
    <>
<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item active>Drivers</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Drivers</h4>
          <p className="mb-0">Here is the list of all drivers.</p>
        </div>
      </div>
      <AllDrivers />
    </>
  );
};
