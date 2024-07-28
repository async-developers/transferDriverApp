import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import axios from 'axios';

export default (data) => {
    const [expenses, setExpenses] = useState();
    useEffect(() => {
        fetchExpenses();
      }, [data]);
    
      const fetchExpenses = async () => {
        try {
          const response = await axios.get(`https://yci26miwxk.execute-api.ap-southeast-1.amazonaws.com/prod/expenses?driverId=${data.id}`);
          const expData = response.data;
          const updatedData = expData.map(item => {
            if(item.firstExpenseCreatedAt !== null){
              return item;
            }
          }).filter(x => x);
          setExpenses(updatedData);

        } catch (error) {
          console.error('Error fetching tours:', error);
        }
      };

  return (
    <>
            {expenses && expenses.map((expense) => (
                <>
                    <tr key={expense.id}>
                        <td>{moment(expense.completedAt).format('YYYY-MM-DD')}</td>
                        <td>{moment(expense.completedAt, 'HH:mm:ss').format('hh:mm A')}</td>
                        <td>{expense.tourName}</td>
                        <td>{expense.expenseType}</td>
                        <td>RM {expense.totalAmount}</td>
                    </tr>
                </>
            ))}
    </>
  );
};
