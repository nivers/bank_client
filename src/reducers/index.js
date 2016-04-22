//node modules
import { combineReducers } from 'redux';

//local
import balanceReducer from './balance_reducer';
import transactionHistoryReducer from './transaction_history_reducer';

const rootReducer = combineReducers({
  balance: balanceReducer,
  transactions: transactionHistoryReducer
});

export default rootReducer;
