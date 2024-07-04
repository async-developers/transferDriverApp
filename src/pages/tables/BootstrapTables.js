import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Breadcrumb } from '@themesberg/react-bootstrap';
import Wallet from '../Wallet';
import ExpensesList from '../examples/CabDriver/Expenses/ExpensesList';

const BootstrapTables = () => {

  return (
    <>
      <Row>
        <div className="col-md-12">
          <Wallet />
        </div>
      </Row>
      {/* <Row>
        <div className="col-md-8">
          <ExpensesList />
        </div>
      </Row> */}
    </>
  );
};

export default BootstrapTables;
