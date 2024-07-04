import React, { useEffect, useState } from 'react';
import { Table, Card, Pagination } from '@themesberg/react-bootstrap';
import axios from 'axios';
import moment from 'moment-timezone';

const ExpensesList = () => {
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchExpenses();
  }, [currentPage]); // Reload expenses when currentPage changes

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`http://ec2-54-208-162-205.compute-1.amazonaws.com:8082/fetchExpenses?page=${currentPage}`);
      setExpenses(response.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h2 className="my-4">Expenses List</h2>
      <Card border="light" className="shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">Tour ID</th>
                <th className="border-bottom">Expense Amount</th>
                <th className="border-bottom">Expense Date</th>
                <th className="border-bottom">Description</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.expenseId}>
                  <td>{expense.tourId}</td>
                  <td>${expense.amount}</td>
                  <td>{moment(expense.expenseDate).format('Do MMMM, YYYY')}</td>
                  <td>{expense.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
        {/* Pagination */}
        <Card.Footer className="d-flex justify-content-center">
          <Pagination>
            <Pagination.Prev onClick={prevPage} disabled={currentPage === 1}> Previous </Pagination.Prev>
            <Pagination.Next onClick={nextPage} disabled={currentPage === totalPages}> Next </Pagination.Next>
          </Pagination>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default ExpensesList;
