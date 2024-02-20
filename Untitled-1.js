// App.jsx

import React, { useState } from 'react';

const BankApp = () => {
  const [balance, setBalance] = useState(1000);
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionType, setTransactionType] = useState('deposit');
  const [transactionHistory, setTransactionHistory] = useState([]);

  const handleTransaction = () => {
    const amount = parseFloat(transactionAmount);

    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid positive amount.');
      return;
    }

    if (transactionType === 'withdraw' && amount > balance) {
      alert('Insufficient funds');
      return;
    }

    const newBalance = transactionType === 'deposit' ? balance + amount : balance - amount;

    setBalance(newBalance);

    const newTransaction = {
      type: transactionType,
      amount,
      date: new Date().toLocaleString(),
    };

    setTransactionHistory([newTransaction, ...transactionHistory]);
    setTransactionAmount('');
  };

  return (
    <div>
      <h1>Simple Bank Application</h1>

      <div>
        <p>Current Balance: ${balance}</p>
      </div>

      <div>
        <label>
          Transaction Type:
          <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
          </select>
        </label>
        <br />
        <label>
          Amount:
          <input
            type="number"
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleTransaction}>Submit</button>
      </div>

      <div>
        <h2>Transaction History</h2>
        <ul>
          {transactionHistory.map((transaction, index) => (
            <li key={index}>
              {transaction.type === 'deposit' ? 'Deposited' : 'Withdrawn'} ${transaction.amount} on{' '}
              {transaction.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BankApp;
