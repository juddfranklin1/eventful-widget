import React from 'react';
import ReactDOM from 'react-dom';

import './eventful/App.css';
import Eventful from './eventful/index.js';


// ========================================

ReactDOM.render(
  <Eventful />,
  document.getElementById('eventful-root')
);
var n = 0;
do{
  n += 1;
  let TestZone = document.getElementById('test-content');
  let TestElement = document.createElement('h3');
  TestElement.innerHTML = 'Click Here';
  TestElement.className = 'square';
  TestZone.append(TestElement);
}while(n<10);