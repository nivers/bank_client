//node modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

//local
import App from './components/app';
import reducers from './reducers';
import validateTransaction from './middleware/validate_transaction';

const createStoreWithMiddleware = applyMiddleware(validateTransaction)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));
