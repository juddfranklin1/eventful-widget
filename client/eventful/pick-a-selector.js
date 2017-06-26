/* Stateless Component
* gathers all the classes from the page
* dumps them into a dropdown.
* Once selected, a class is tracked.
* TODO: Offer other selectors
* perhaps integrate sizzle
*/

import React from 'react';
import ReactDOM from 'react-dom';

const PickASelector = function (props) {

  const eventName = props.eventName;

  return (
  <div>
    <label htmlFor="fromExisting"><h4>Pick from existing page classes to track { eventName && eventName } events on.</h4>
      <select id="fromExisting" onChange={ (ev, eventName) => (props.selectClass(ev.target.value, eventName)) }>
        <option default disabled selected>Pick a selector to track</option>
        { props.pageClasses.map((e,i)=>(<option key={ i } value={ e }>{ e }</option>)) }
      </select>
    </label>
  </div>);
}
export default PickASelector;
