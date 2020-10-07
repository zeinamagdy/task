import React from 'react';
import Home from './containers/home/home'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import './App.scss';
import thunk from 'redux-thunk';
import userReducer from './store/reducers/user'

const store = createStore(userReducer, applyMiddleware(thunk))

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Home />
      </div>
    </Provider>
  );
}

export default App;
