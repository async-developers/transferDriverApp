import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Button } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faClock, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment-timezone';
import axios from 'axios';
import TransactionCard from './subComponents/TransactionCard';
import Expenses from './subComponents/Expenses';

const Wallet = ({ data }) => {
  const [walletData, setWalletData] = useState();
  
  useEffect(() => {
    axios.get(`https://yci26miwxk.execute-api.ap-southeast-1.amazonaws.com/prod/walletDetails?driverId=${data.id}`)
      .then(response => {
        setWalletData(response.data);
      })
      .catch(error => {
        console.error('Error fetching wallet data:', error);
      });
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://yci26miwxk.execute-api.ap-southeast-1.amazonaws.com/prod/withdraw', {
        amount: walletData.balance,
        driverId: data.id
      });
    } catch (error) {
      console.error(error)
    }
  };

  const isDisabled = !walletData || parseFloat(walletData.balance) === 0;

  return (
    <Row>
      <Col xs={12} md={8}>
        {/* Wallet Details Card */}
        <Card border="light" className="bg-white shadow-sm my-5">
          {walletData && (
            <>
          <Card.Header className="border-bottom">
            <h5 className="mb-0"><FontAwesomeIcon icon={faWallet} className="me-2" /> My Wallet</h5>
          </Card.Header>
          <Card.Body>
            <Row className="mb-3">
              <Col xs={6} md={6}>
                <p className="mb-1 text-muted">Current Balance</p>
                <h4 className="mb-0">RM {parseInt(walletData.balance).toFixed(2)}</h4>
              </Col>
              <Col xs={6} md={6}>
                <div className='mb-2 d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center pt-4'>
                    <Button variant="primary" className="m-1 upperCase-keyword text-dark me-2 dropdown-toggle btn btn-secondary" onClick={handleSubmit} disabled={isDisabled}>
                       Withdraw
                    </Button>
                </div>
              </Col>
            </Row>
            <span className='f-12'>Last updated on {moment(walletData.updatedAt).format('dddd')} {moment(walletData.updatedAt).format('Do MMMM, YYYY')}</span>
          </Card.Body>
          </>
          )}
        </Card>

        {/* Tracking History Card (Timeline) */}
        <Card border="light" className="bg-white shadow-sm mb-4">
          <Card.Header className="border-bottom">
            <h5 className="mb-0"><FontAwesomeIcon icon={faClock} className="me-2" /> Transactions History</h5>
          </Card.Header>
          <Card.Body>
            {TransactionCard(data)}
          </Card.Body>
        </Card>

        <Card border="light" className="bg-white shadow-sm mb-4">
          <Card.Header className="border-bottom">
            <h5 className="mb-0"><FontAwesomeIcon icon={faMoneyCheckAlt} className="me-2" /> Expenses History</h5>
          </Card.Header>
          <Card.Body>
            <Table responsive className="table table-hover">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Tour Name</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
              {Expenses(data)}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Wallet;
