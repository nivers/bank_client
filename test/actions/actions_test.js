//node modules
import { expect } from 'chai';

//local
import { DEPOSIT_FUNDS, WITHDRAW_FUNDS } from '../../src/actions/types';
import { depositFunds, withdrawFunds, VALID_DEPOSIT_RANGE, VALID_WITHDRAWAL_RANGE } from '../../src/actions/index';

describe('actions', () => {

  describe('DEPOSIT_FUNDS', () => {
    it('is of correct type, payload and time stamp', () => {
      const amount = 341.43;
      const now = new Date();
      const depositAction = depositFunds(amount, now);
      expect(depositAction.type).to.equal(DEPOSIT_FUNDS);
      expect(depositAction.payload).to.equal(amount);
      expect(depositAction.timeStamp).to.eql(now);
    });

    it('generates timestamp if not passed to constructor', () => {
      const depositAction = depositFunds(100);
      const { timeStamp } = depositAction;
      expect(timeStamp).to.exist;
      expect(timeStamp instanceof Date).to.be.true;
    });

    it('throws if payload is not a number', () => {
      expect(() => depositFunds('123')).to.throw(/deposit amount data type must be "number"/);
    });

    it('throws if payload is numeric, but has precision beyond the 100ths place', () => {
      const invalidNumber = 123.123;
      expect(() => depositFunds(invalidNumber)).to.throw(/deposit amount is too precise/);
    });

    it('throws if payload is too (numerically) small', () => {
      const tooSmall = VALID_DEPOSIT_RANGE[0] - .01;
      expect(() => depositFunds(tooSmall)).to.throw(/deposit amount is out of valid range/);
    });

    it('throws if payload is too (numerically) large', () => {
      const tooLarge = VALID_DEPOSIT_RANGE[1] + .01;
      expect(() => depositFunds(tooLarge)).to.throw(/deposit amount is out of valid range/);
    });

    it('accepts as payload numbers that are of valid precision and within acceptable range', () => {
      const minValid = VALID_DEPOSIT_RANGE[0];
      const maxValid = VALID_DEPOSIT_RANGE[1];
      const validValues = [minValid, minValid + .01, maxValid - .01, maxValid];
      const makeValidDeposits = () => validValues.forEach(val => depositFunds(val));
      expect(makeValidDeposits).to.not.throw();
    });
  });

  describe('WITHDRAW_FUNDS', () => {
    it('is of correct type, payload and time stamp', () => {
      const amount = 54.23;
      const now = new Date();
      const withdrawal = withdrawFunds(amount, now);

      expect(withdrawal.type).to.equal(WITHDRAW_FUNDS);
      expect(withdrawal.payload).to.equal(amount);
      expect(withdrawal.timeStamp).to.eql(now);
    });

    it('generates timestamp if not passed to constructor', () => {
      const withdrawAction = withdrawFunds(100);
      const { timeStamp } = withdrawAction;
      expect(timeStamp).to.exist;
      expect(timeStamp instanceof Date).to.be.true;
    });

    it('throws if payload is not a number', () => {
      expect(() => withdrawFunds('123')).to.throw(/withdraw amount data type must be "number"/);
    });

    it('throws if payload is numeric, but has precision beyond the 100ths place', () => {
      const invalidNumber = 123.123;
      expect(() => withdrawFunds(invalidNumber)).to.throw(/withdraw amount is too precise/);
    });

    it('throws if payload is too (numerically) small', () => {
      const tooSmall = VALID_WITHDRAWAL_RANGE[0] - .01;
      expect(() => withdrawFunds(tooSmall)).to.throw(/withdraw amount is out of valid range/);
    });

    it('throws if payload is too (numerically) large', () => {
      const tooLarge = VALID_WITHDRAWAL_RANGE[1] + .01;
      expect(() => withdrawFunds(tooLarge)).to.throw(/withdraw amount is out of valid range/);
    });

    it('accepts as payload numbers that are of valid precision and within acceptable range', () => {
      const minValid = VALID_WITHDRAWAL_RANGE[0];
      const maxValid = VALID_WITHDRAWAL_RANGE[1];
      const validValues = [minValid, minValid + .01, maxValid - .01, maxValid];
      const makeValidDeposits = () => validValues.forEach(val => withdrawFunds(val));
      expect(makeValidDeposits).to.not.throw();
    });
  });
});
