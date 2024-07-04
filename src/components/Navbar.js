import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Image, Navbar, Dropdown, Container, Nav } from '@themesberg/react-bootstrap';
import { Redirect } from 'react-router-dom';

import Profile3 from "../assets/img/team/taxi-driver.png";
import Preloader from "./Preloader";

const NavbarComponent = ({ data }) => {
  const [redirect, setRedirect] = useState(false); // State to control redirection
  const [loading, setLoading] = useState(false); // State to control loading spinner

  const handleLogout = () => {
    setLoading(true); // Start showing the loading spinner

    // Simulate logout process (e.g., remove token)
    localStorage.removeItem('token');

    // Simulate delay for demonstration purposes (you can remove setTimeout in actual implementation)
    setTimeout(() => {
      setRedirect(true); // Set redirect to true after logout process
      setLoading(false); // Stop showing the loading spinner
    }, 1000); // Simulating a 1 second delay
  };

  if (loading) {
    return <Preloader show={true} />; // Show loading spinner while logging out
  }

  if (redirect) {
    return <Redirect to="/sign-in" />; // Redirect to login page after logout
  }

  return (
    <Navbar variant="light" expanded className="ps-0 pe-4 pb-0 navbar-light d-none d-sm-block">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-end w-100">
          <Nav className="align-items-center">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <Image src={Profile3} className="user-avatar md-avatar rounded-circle" />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="d-lg-block mb-0 font-small fw-bold text-capitalize">{data.username}</span>                
                    <span className="d-lg-block mb-0 font-small fw-italic text-capitalize">{data.role}</span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faUserCircle} className="me-2" /> My Profile
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
