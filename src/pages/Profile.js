import React from "react";
import { Col, Row } from '@themesberg/react-bootstrap';
import  ProfilePage  from "../components/ProfilePage";

const user = {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  address: '123 Main St, City, Country',
  contactNumber: '+99 1231231231',
  dateOfBirth: '01/5/2024',
  dateOfJoining: '01/5/2024',
  drivingLicence: 'XXX12346777743',
  carNumber: 'MY 123123 122',
  gender: 'Male'
};

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
