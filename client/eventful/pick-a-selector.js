import React from 'react';
import ReactDOM from 'react-dom';

const PickASelector = function (props) {
  return (<div>
    <h3>Pick some classes to track events on.</h3>
    <p>The following classes have been selected for tracking on this page.</p>
    <ul>
      { props.selectedClasses.map((e,i)=>( <li key={ i }>{ e }</li>)) }
    </ul>
    <select onChange={ (ev) => (props.selectClass(ev.target.value)) }>
      <option value="" required selected disabled>Pick from existing page classes</option>
      { props.pageClasses.map((e,i)=>(<option key={ i } value={ e }>{ e }</option>)) }
    </select>
  </div>);
}
export default PickASelector;