import { DEPOSIT_FUNDS, WITHDRAW_FUNDS } from './types';

export const VALID_DEPOSIT_RANGE = [ 0, 100000 ];
export const VALID_WITHDRAWAL_RANGE = [ 0, 10000 ];

const MAX_VALID_DECIMAL_PLACES = 2;

function isTooPrecise(num) {
  const numAsString = String(num);
  const fixedNum = num.toFixed(MAX_VALID_DECIMAL_PLACES);
  return numAsString.length > fixedNum.length;
}

//deposits and withdrawals are very similar, this function takes the differences as parameters
const transaction = validRange => actionType => description => {
  return function(amount, timeStamp) {
    if(typeof amount !== 'number') {
      throw new Error(`${description} amount data type must be "number"`);
    }

    if(isTooPrecise(amount)) {
      throw new Error(`${description} amount is too precise`);
    }

    if(amount < validRange[0] || amount > validRange[1]) {
      throw new Error(`${description} amount is out of valid range`);
    }

    return {
      type: actionType,
      payload: amount,
      timeStamp: timeStamp || new Date()
    };
  }
}

export const depositFunds = transaction(VALID_DEPOSIT_RANGE)(DEPOSIT_FUNDS)('deposit');
export const withdrawFunds = transaction(VALID_WITHDRAWAL_RANGE)(WITHDRAW_FUNDS)('withdraw');
