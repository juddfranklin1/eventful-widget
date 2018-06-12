import React from 'react';

import './styles/App.css';
import Eventful from './components/index.js';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// ========================================

render(
  <Provider store={ store }>
    <Eventful />
  </Provider>,
  document.getElementById('eventful-root')
);