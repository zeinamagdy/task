import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
// TODO: check if i need redux
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import userReducer from './store/reducers/user'
import './index.scss';
import App from './App';

const store = createStore(userReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
