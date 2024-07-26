import React, { useEffect, useState } from 'react';
import { Table, Card, Pagination, Button } from '@themesberg/react-bootstrap';
import axios from 'axios';
import moment from 'moment-timezone';
import DriverDetailsPage from './DriversDetailsPage'; // Assuming this is where driver details are shown

const AllDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // State to hold total pages

  // State for expanded driver details
  const [expandedDriver, setExpandedDriver] = useState(null);

  useEffect(() => {
    fetchDrivers();
  }, [currentPage]);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get(`https://yci26miwxk.execute-api.ap-southeast-1.amazonaws.com/prod/fetchDrivers?page=${currentPage}`);
      setDrivers(response.data);
      setTotalPages(response.data.totalPages); // Update total pages from response
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  // Handle expand details
  const toggleDriverDetails = (driver) => {
    if (expandedDriver && expandedDriver.driverId === driver.driverId) {
      // Collapse the expanded row if it's already expanded
      setExpandedDriver(null);
    } else {
      // Expand the clicked row
      setExpandedDriver(driver);
    }
  };

  // Check if a row is currently expanded
  const isRowExpanded = (driver) => {
    return expandedDriver && expandedDriver.driverId === driver.driverId;
  };

  return (
    <div>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">Driver Name</th>
                <th className="border-bottom">Driving Licence</th>
                <th className="border-bottom">Email</th>
                <th className="border-bottom">Contact Number</th>
                <th className="border-bottom">Joining Date</th>
                <th className="border-bottom">Car Number</th>
                <th className="border-bottom">Status</th>
                <th className="border-bottom">Actions</th> {/* New column for actions */}
              </tr>
            </thead>
            <tbody>
              {drivers.map(driver => (
                <>
                  <tr key={driver.driverId}>
                    <td><span className="fw-normal upperCase-keyword">{driver.firstName} {driver.lastName}</span></td>
                    <td><span className="fw-normal">{driver.driverLicence}</span></td>
                    <td><span className="fw-normal">{driver.email}</span></td>
                    <td><span className="fw-normal">{driver.contactNumber}</span></td>
                    <td><span className="fw-normal">{moment(driver.joiningDate).format('Do MMMM, YYYY')}</span></td>
                    <td><span className="fw-normal">{driver.carNumber}</span></td>
                    <td><span className={`upperCase-keyword me-2 btn btn-sm text-capitalize ${driver.status === 'Busy' ? 'btn-danger' : 'btn-tertiary'}`}>{driver.status}</span></td>
                    <td>
                      <Button size="sm" variant="primary" onClick={() => toggleDriverDetails(driver)}>
                        {isRowExpanded(driver) ? 'Hide Details' : 'View Details'}
                      </Button>
                    </td>
                  </tr>
                  {isRowExpanded(driver) && (
                    <tr key={`${driver.driverId}-details`} className="expanded-row">
                      <td colSpan="8">
                        <DriverDetailsPage driver={driver} />
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </Table>
          {/* Pagination controls */}
          <div className="pagination-controls d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.Prev onClick={prevPage} disabled={currentPage === 1}>Previous</Pagination.Prev>
              <Pagination.Next onClick={nextPage} disabled={currentPage === totalPages}>Next</Pagination.Next>
            </Pagination>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AllDrivers;
