import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger';
import { Provider } from 'react-redux';

import reducer from '../store/reducer';
import App from './App';

const store = createStore(reducer, applyMiddleware(logger))

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
