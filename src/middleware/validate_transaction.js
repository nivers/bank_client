import { WITHDRAW_FUNDS } from '../actions/types';

export default ({ dispatch, getState }) =>  next => action => {

  if(action.type !== WITHDRAW_FUNDS) {
    return next(action);
  }

  //only pass on withdrawals that have payload values that don't exceed current balance
  const currentBalance = getState().balance;
  if(action.payload <= currentBalance) {
    return next(action);
  }
  else {
    //handle invalid withdrawals gracefully
  }
}
