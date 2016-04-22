//node modules
import { combineReducers } from 'redux';

//local
import balanceReducer from './balance_reducer';

const rootReducer = combineReducers({
  balance: balanceReducer
});

export default rootReducer;
