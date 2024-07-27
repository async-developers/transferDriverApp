import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle  } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, ListGroup } from '@themesberg/react-bootstrap';
import moment from 'moment-timezone';
import axios from 'axios';

export default (data) => {
    const [transactions, setTransactions] = useState();
    useEffect(() => {
      const fetchTours = async () => {
        try {
          const response = await axios.get(`https://yci26miwxk.execute-api.ap-southeast-1.amazonaws.com/prod/transactions?driverId=${data.id}`);
          setTransactions(response.data);
        } catch (error) {
          console.error('Error fetching tours:', error);
        }
      };

      fetchTours();
    }, [data]);

  return (
    <>
        <ListGroup className="rotating-paragraph-section">
            {transactions && transactions.map((item) => (
                <>
                <ListGroup.Item className="paragraph-section" data-paragraph-section="">
                    <Row>
                    <Col xs={2} md={1} className="d-flex paragraph-section__logo-box align-items-center">
                        <FontAwesomeIcon icon={item.transactionType === 'credit' ? faPlusCircle : faMinusCircle} size="2x" className={item.transactionType === 'credit' ? 'progress-label text-tertiary mt-1 me-2' : 'icon icon-xxs text-danger me-1'} />                    
                    </Col>
                    
                    <Col xs={10} md={11} className="paragraph-section__text-content">
                    <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center'>
                        <div className='d-block'>
                        <p className="paragraph-section__description mb-0-imp fw-regular">
                        {item.description}
                        </p>
                        <span className='small text-gray fw-light'>{moment(item.transactionDate).format('Do MMMM, YYYY')} {moment(item.transactionDate, 'HH:mm:ss').format('hh:mm A')}</span>
                        </div>
                        <p className={item.transactionType === 'credit' ? 'progress-label text-tertiary mt-1 me-2 fw-bold' : 'icon icon-xxs text-danger me-1 fw-bold'}>
                        RM {item.amount}
                        </p>
                        </div>
                    </Col>
                    </Row>
                </ListGroup.Item>
                           
                       </>
            ))}
        </ListGroup>
    </>
  );
};
