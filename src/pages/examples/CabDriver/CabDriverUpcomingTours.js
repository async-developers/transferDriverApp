import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Breadcrumb } from '@themesberg/react-bootstrap';
import TourList from "./TourList";


export default ({data}) => {
  return (
    <>
<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Upcoming Trips</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Upcoming Trips</h4>
          <p className="mb-0">Here is a list of all assigned upcoming trips</p>
        </div>
      </div>

      <TourList data={data}/>
    </>
  );
};
