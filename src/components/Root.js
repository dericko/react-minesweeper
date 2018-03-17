import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux';

import reducer from '../store/reducer';
import App from './App';

const store = createStore(reducer);

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
