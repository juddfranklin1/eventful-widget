import React from 'react';
import ReactDOM from 'react-dom';

const Navigation = function(props) {
  return (
    <ul className="eventful-navigation">
      <li><a onClick={ () => props.changeTab('tracker') }>Tracker</a></li>
      <li><a onClick={ () => props.changeTab('options') }>Options</a></li>
    </ul>);
}
export default Navigation;