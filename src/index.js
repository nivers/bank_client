//node modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';

//local
import App from './components/app';
import reducers from './reducers';
import validateTransaction from './middleware/validate_transaction';
import routes from './routes';

const createStoreWithMiddleware = applyMiddleware(validateTransaction)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.container'));
