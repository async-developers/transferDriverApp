import React, { useEffect, useState } from 'react';
import { Table, Card, Pagination } from '@themesberg/react-bootstrap';
import axios from 'axios';
import moment from 'moment-timezone';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // State to hold total pages

  useEffect(() => {
    fetchCustomers();
  }, [currentPage]); 

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`https://yci26miwxk.execute-api.ap-southeast-1.amazonaws.com/prod/fetchCustomers?page=${currentPage}`);
      setCustomers(response.data);
      setTotalPages(response.data.totalPages); // Update total pages from response
    } catch (error) {
      console.error('Error fetching customers:', error);
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

  return (
    <div>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">Customer Name</th>
                <th className="border-bottom">Email</th>
                <th className="border-bottom">Contact Number</th>
                <th className="border-bottom">Created</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.customerId}>
                  <td><span className='upperCase-keyword'><strong>{customer.fullName}</strong></span></td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{moment(customer.createdAt).format('Do MMMM, YYYY')}</td>
                </tr>
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

export default CustomerList;
