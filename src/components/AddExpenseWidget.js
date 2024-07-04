import React, { useState } from 'react';
import { Button, Modal, Form } from '@themesberg/react-bootstrap';

const AddExpenseWidget = ({ show, handleClose, handleAddExpense }) => {
  const [expenseType, setExpenseType] = useState('');
  const [amount, setAmount] = useState('');

  const handleExpenseTypeChange = (e) => {
    setExpenseType(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddExpense({ expenseType, amount });
    setExpenseType('');
    setAmount('');
    handleClose();
  };

  return (
    <Modal as={Modal.Dialog} centered show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title className="h6">Add Expense</Modal.Title>
        <Button variant="close" aria-label="Close" onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Expense Type</Form.Label>
            <Form.Select value={expenseType} onChange={handleExpenseTypeChange}>
              <option>Select Expense Type</option>
              <option value="Petrol Fee">Petrol Fee</option>
              <option value="Parking Charges">Parking Charges</option>
              <option value="Toll Tax">Toll Tax</option>
              {/* Add more expense types as needed */}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="text" placeholder="Enter amount" value={amount} onChange={handleAmountChange} />
          </Form.Group>
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddExpenseWidget;
