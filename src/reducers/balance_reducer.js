import { DEPOSIT_FUNDS, WITHDRAW_FUNDS } from '../actions/types';

export default function(state = 0, action) {

  if(action.type === DEPOSIT_FUNDS) {
    return (state + action.payload);
  }

  if(action.type === WITHDRAW_FUNDS) {
    const newBalance = state - action.payload;

    if(newBalance < 0) {
      throw new Error('Cannot withraw amoount that is greater than balance');
    }
    return (state - action.payload);
  }

  return state;
}
