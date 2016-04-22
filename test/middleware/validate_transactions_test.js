//node modules
import { expect } from 'chai';
import { createStore, applyMiddleware } from 'redux';

//local
import rootReducer from '../../src/reducers/index';
import validateTransaction from '../../src/middleware/validate_transaction';
import { depositFunds, withdrawFunds } from '../../src/actions/index';

describe('Validate transaction middleware', () => {

  let store;
  const initialBalance = 100;
  const getBalance = () => store.getState().balance;
  beforeEach(() => {
    store = applyMiddleware(validateTransaction)(createStore)(rootReducer);
    store.dispatch(depositFunds(initialBalance));
  });

  it('Should allow deposits through to reducer', () => {
    const depositAmount = 100;
    store.dispatch(depositFunds(depositAmount));
    expect(getBalance()).to.equal(initialBalance + depositAmount);
  });

  it('Should allow valid withdrawals to be passed to reducer', () => {
    const withdrawAmount = 50;
    store.dispatch(withdrawFunds(withdrawAmount));
    expect(getBalance()).to.equal(initialBalance - withdrawAmount);
  });

  it('Should block withdrawals that reduce balance to less than zero', () => {
    const withdrawAmount = initialBalance + .01;
    store.dispatch(withdrawFunds(withdrawAmount));
    expect(getBalance()).to.equal(initialBalance);
  });
});
