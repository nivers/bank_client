import { DEPOSIT_FUNDS, WITHDRAW_FUNDS } from '../actions/types';

export function Transaction(changeInBalance, timeStamp) {
  this.changeInBalance = changeInBalance;

  //"re-construct" the date in order to make a shallow copy
  this.timeStamp = new Date(timeStamp);
}

export default function(state = [], action) {

  if(action.type === DEPOSIT_FUNDS) {
    const { payload, timeStamp } = action;
    return [ ...state, new Transaction(payload, timeStamp) ];
  }

  if(action.type === WITHDRAW_FUNDS) {
    const { payload, timeStamp } = action;
    return [ ...state, new Transaction(payload * -1, timeStamp) ];
  }

  return state;
}
