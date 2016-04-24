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
    <div>
      To do: list of {transactions.length} transactions
    </div>
  );
}
