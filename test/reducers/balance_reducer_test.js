//node modules
import { expect } from 'chai';

//local
import balanceReducer from '../../src/reducers/balance_reducer';
import { depositFunds, withdrawFunds } from '../../src/actions';


describe('Balance reducer', () => {
  it('handles action with unknown type and undefined payload', () => {
    expect(balanceReducer(undefined, {})).to.equal(0);
  });

  it('does not change value of balance if action is not withdrawFunds or depositFunds', () => {
    expect(balanceReducer(100, { type: 'foo', payload: 'bar'})).to.equal(100);
  });

  it('Increments balance by payload amount if action type is "depositFunds"', () => {
    const depositAction = depositFunds(100.50);
    expect(balanceReducer(100, depositAction)).to.equal(200.50);
  });

  it('Decrements balance by payload amount if action type is "withdrawFunds"', () => {
    const withdrawAction = withdrawFunds(50);
    expect(balanceReducer(100, withdrawAction)).to.equal(50);
  });

  it('Throws an error if withdrawal would result in balance of less than 0', () => {
    const withdrawAction = withdrawFunds(50.01);
    expect(() => balanceReducer(50, withdrawAction)).to.throw(/Cannot withraw amoount that is greater than balance/);
  });
});
