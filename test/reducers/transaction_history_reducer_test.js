//node modules
import { expect } from 'chai';

//local
import transactionHistoryReducer, { Transaction } from '../../src/reducers/transaction_history_reducer';
import { depositFunds, withdrawFunds } from '../../src/actions';

describe('Transaction history reducer', () => {
  it('handles action with unknown type and undefined payload and has a default state of empty array', () => {
    expect(transactionHistoryReducer(undefined, {})).to.eql([]);
  });

  it('does not change value (or reference) of balance if action is not withdrawFunds or depositFunds', () => {
    const emptyState = [];
    expect(transactionHistoryReducer(emptyState, { type: 'foo', payload: 'bar' })).to.equal(emptyState);
  });

  describe('On deposits', () => {
    const now = new Date();
    const amount = 100;
    const depositAction = depositFunds(amount, now);
    const history = transactionHistoryReducer([], depositAction);

    it('Should add one object to transaction history', () => {
      expect(history.length).to.equal(1);
    });

    it('New transaction be instance of Transaction class with correct data', () => {
      const transaction = history[0];
      expect(transaction instanceof Transaction).to.be.true;
      expect(transaction.id).to.exist;
      expect(transaction.timeStamp).to.eql(now);
      expect(transaction.changeInBalance).to.equal(amount);
    });
  });

  describe('On withdrawals', () => {
    const now = new Date();
    const amount = 100;
    const withdrawAction = withdrawFunds(amount, now);
    const history = transactionHistoryReducer([], withdrawAction);

    it('Should add one object to transaction history', () => {
      expect(history.length).to.equal(1);
    });

    it('New transaction be instance of Transaction class with correct data', () => {
      const transaction = history[0];
      expect(transaction instanceof Transaction).to.be.true;
      expect(transaction.timeStamp).to.eql(now);
      expect(transaction.changeInBalance).to.equal(-amount);
    });
  });
});
