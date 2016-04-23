//node modules
import React from 'react';

export default function(props) {
  const { transactions } = props;

  return (
    <div className="transaction-history">
      <h1>
        Transaction History
      </h1>
      {transactions.length > 0 ? this.transactions() : (<span>No transactions yet</span>)}
    </div>
  );
}
