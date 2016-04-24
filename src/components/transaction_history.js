//node modules
import React from 'react';

export default function({ transactions = [] }) {

  return (
    <div className="transaction-history">
      <h1>
        Transaction History
      </h1>
      {transactions.length > 0 ? transactionsList(transactions) : (<span>No transactions yet</span>)}
    </div>
  );
}

function transactionsList(transactions) {
  return(
    <div className="ui middle aligned divided list">
      {transactions.slice().reverse().map(transactionListItem)}
    </div>
  );
}

function transactionListItem(transaction) {
  const { changeInBalance, timeStamp, id } = transaction;

  const date = timeStamp.toLocaleDateString();
  const hour = timeStamp.getHours();
  const minute = timeStamp.getMinutes();
  const displayTimeStamp = `${date} at ${hour}:${minute}`;

  let color;
  let displayAmount;
  if(changeInBalance > 0) {
    color = 'green';
    displayAmount = `$${changeInBalance.toFixed(2)}`;
  }
  else {
    color = 'red';
    displayAmount = `($${Math.abs(changeInBalance).toFixed(2)})`;
  }

  return (
    <div className="item" key={id}>
      <div className={`right floated content ${color}`}>
        {displayAmount}
      </div>
      <div className="content">
        {displayTimeStamp}
      </div>
    </div>
  );
}
