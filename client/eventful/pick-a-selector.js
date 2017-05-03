import React from 'react';
import ReactDOM from 'react-dom';

const PickASelector = function (props) {
  return (
  <div>
    <h3>Pick some classes to track events on.</h3>
    <label htmlFor="fromExisting">Pick from existing page classes
      <select id="fromExisting" onChange={ (ev) => (props.selectClass(ev.target.value)) }>
        <option default disabled selected>Pick a class from the current page.</option>
        { props.pageClasses.map((e,i)=>(<option key={ i } value={ e }>{ e }</option>)) }
      </select>
    </label>
  </div>);
}
export default PickASelector;