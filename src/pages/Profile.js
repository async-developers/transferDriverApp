import React from "react";
import { Col, Row } from '@themesberg/react-bootstrap';
import  ProfilePage  from "../components/ProfilePage";

export default ({data}) => {
  const updatedData = {...data, userRole: data.role, approvalStatus: "Approved"  }
  return (
    <>
      <Row>
        <Col xs={12} xl={12}>
        <ProfilePage userData={updatedData} />
        </Col>
      </Row>
    </>
  );
};
