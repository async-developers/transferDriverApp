import React, { useState } from 'react';
import { Button } from '@themesberg/react-bootstrap';
import AddExpenseWidget from '../../components/AddExpenseWidget';

const ExpensesWidget = () => {
  const [showForm, setShowForm] = useState(false);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleAddExpense = (expense) => {
    // Handle adding expense data here
    console.log('Expense added:', expense);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleOpenForm}>Add Expense</Button>
      <AddExpenseWidget show={showForm} handleClose={handleCloseForm} handleAddExpense={handleAddExpense} />
    </div>
  );
}

export default ExpensesWidget;
