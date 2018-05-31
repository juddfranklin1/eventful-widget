import React from 'react';
import ReactDOM from 'react-dom';
import GoSettings from 'react-icons/lib/go/settings';
import GoRadioTower from 'react-icons/lib/go/radio-tower';
import GoPlus from 'react-icons/lib/go/plus';

const Navigation = function(props) {
  return (
    <ul className={ `eventful-navigation ${props.activeTab }`}>
      <li id="tracker-link"><a onClick={ () => props.changeTab('tracker') }><GoRadioTower /> Tracker</a></li>
      <li id="add-link"><a onClick={ () => props.changeTab('add') }><GoPlus /> Add</a></li>
      <li id="options-link"><a onClick={ () => props.changeTab('options') }><GoSettings /> Options</a></li>
    </ul>);
}
export default Navigation;