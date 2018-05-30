import React from 'react';
import ReactDOM from 'react-dom';
import GoGear from 'react-icons/lib/go/gear';
import GoTelescope from 'react-icons/lib/go/telescope';
import GoTools from 'react-icons/lib/go/tools';

const Navigation = function(props) {
  return (
    <ul className={ `eventful-navigation ${props.activeTab }`}>
      <li id="tracker-link"><a onClick={ () => props.changeTab('tracker') }><GoTelescope /> Tracker</a></li>
      <li id="options-link"><a onClick={ () => props.changeTab('options') }><GoTools /> Options</a></li>
      <li id="add-link"><a onClick={ () => props.changeTab('add') }><GoGear /> Add</a></li>
    </ul>);
}
export default Navigation;