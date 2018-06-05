import React from 'react';
import ReactDOM from 'react-dom';

const Counter = function(props){
  const moduleContent = props.targetSelectors.length === 0 ?
    (<div className="eventful-counter">
      <h3>Nothing to be tracked yet.</h3>
      <p>Pick some classes to track by clicking "add" above.</p>
    </div>) :
    (<div className="eventful-counter">
      <h3>Selectors Tracked:</h3>
      <ul>
      { props.targetSelectors.map((e, i)=>( <li key={ i }>{ e.selector } tracking { e.event } - { e.count }</li> )) }
      </ul>
      <h4>{ props.update }</h4>
    </div>);
  return(
    <div className="eventful-counter">
       { moduleContent }
     </div>
  );
}

export default Counter;
