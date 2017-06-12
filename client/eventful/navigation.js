import React from 'react';
import ReactDOM from 'react-dom';

const Navigation = function(props) {
  return (
    <ul className={ `eventful-navigation ${props.activeTab }`}>
      <li id="tracker-link"><a onClick={ () => props.changeTab('tracker') }>Tracker</a></li>
      <li id="options-link"><a onClick={ () => props.changeTab('options') }>Options</a></li>
      <li id="add-link"><a onClick={ () => props.changeTab('add') }>Add</a></li>
    </ul>);
}
export default Navigation;