import React from 'react';
import { Container, Row, Col, Card, Table, Button } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faClock, faMoneyCheckAlt, faPlus, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment-timezone';

const Wallet = () => {
  // Example wallet data (replace with actual fetched data)
  const walletData = {
    balance: 5000.75,
    currency: 'USD',
    transactions: [
      { id: 1, date: '2024-06-30', description: 'Payment from Client A', amount: 1500.25 },
      { id: 2, date: '2024-06-29', description: 'Monthly Salary', amount: 3000.00 },
      { id: 3, date: '2024-06-28', description: 'Online Purchase', amount: -500.50 }
    ]
  };

  // Example tracking history data
  const trackingHistory = [
    { id: 1, date: '2024-06-30', event: 'Item shipped', location: 'Warehouse A' },
    { id: 2, date: '2024-06-28', event: 'Order received', location: 'Customer Address' }
  ];

  // Example expenses history data
  const expensesHistory = [
    { id: 1, date: '2024-06-30', category: 'Travel', description: 'Flight tickets', amount: 500.00 },
    { id: 2, date: '2024-06-28', category: 'Food', description: 'Dinner with clients', amount: 120.50 }
  ];

  return (
      <Row>
        <Col xs={12} md={8}>
          {/* Wallet Details Card */}
          <Card border="light" className="bg-white shadow-sm my-5">
            <Card.Header className="border-bottom">
              <h5 className="mb-0"><FontAwesomeIcon icon={faWallet} className="me-2" /> My Wallet</h5>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col xs={6} md={6}>
                  <p className="mb-1 text-muted">Current Balance</p>
                  <h4 className="mb-0">{walletData.currency} {walletData.balance.toFixed(2)}</h4>
                </Col>
                <Col xs={6} md={6}>
                  <div className='mb-2 d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center pt-4'>
                      <Button variant="primary" size="sm" className="m-1 upperCase-keyword" >
                         Withdraw
                      </Button>
                  </div>
                </Col>

              </Row>
            </Card.Body>
          </Card>

          {/* Tracking History Card (Timeline) */}
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Header className="border-bottom">
              <h5 className="mb-0"><FontAwesomeIcon icon={faClock} className="me-2" /> Tracking History</h5>
            </Card.Header>
            <Card.Body>
              {trackingHistory.map(event => (
                <Row key={event.id} className="mb-3">
                  <Col xs={2} className="text-center">
                    <div className="timeline-date">{moment(event.date).format('MMM DD')}</div>
                  </Col>
                  <Col xs={10}>
                    <p className="mb-0">{event.event}</p>
                    <p className="text-muted mb-0">{event.location}</p>
                  </Col>
                </Row>
              ))}
            </Card.Body>
          </Card>
        </Col>

        {/* Expenses History Card (Table) */}
        <Col xs={12} md={4}>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Header className="border-bottom">
              <h5 className="mb-0"><FontAwesomeIcon icon={faMoneyCheckAlt} className="me-2" /> Expenses History</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive className="table table-hover">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {expensesHistory.map(expense => (
                    <tr key={expense.id}>
                      <td>{moment(expense.date).format('YYYY-MM-DD')}</td>
                      <td>{expense.category}</td>
                      <td>{expense.description}</td>
                      <td>{expense.amount.toFixed(2)} {walletData.currency}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
  );
};

export default Wallet;
