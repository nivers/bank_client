//node modules
import { expect } from 'chai';

//local
import { DEPOSIT_FUNDS, WITHDRAW_FUNDS } from '../../src/actions/types';
import { depositFunds, withdrawFunds, VALID_DEPOSIT_RANGE, VALID_WITHDRAWAL_RANGE } from '../../src/actions/index';

describe('actions', () => {

  describe('DEPOSIT_FUNDS', () => {
    it('is of correct type', () => {
      const depositAction = depositFunds(321.43);
      expect(depositAction.type).to.equal(DEPOSIT_FUNDS);
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

    it('accepts as payload numbers that are of valid precision', () => {
      const validValues = [123, 123.1, 123.1];
      const makeValidDeposits = () => validValues.forEach(val => depositFunds(val));
      expect(makeValidDeposits).to.not.throw();
    });
  });

  describe('WITHDRAW_FUNDS', () => {
    it('is of correct type', () => {
      const withdrawal = withdrawFunds(54.23);
      expect(withdrawal.type).to.equal(WITHDRAW_FUNDS);
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

    it('accepts as payload numbers that are of valid precision', () => {
      const validValues = [123, 123.1, 123.1];
      const makeValidDeposits = () => validValues.forEach(val => withdrawFunds(val));
      expect(makeValidDeposits).to.not.throw();
    });
  });
});
