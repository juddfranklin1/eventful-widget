import React from 'react';
import ReactDOM from 'react-dom';

const Counter = function(props){
  const moduleContent = props.targetClasses.length === 0 ?
    (<div className="eventful-counter">
      <h3>Nothing to be tracked yet.</h3>
      <p>Pick some classes to track by clicking "options" above.</p>
    </div>) :
    (<div className="eventful-counter">
      <h3>Classes Tracked: { props.targetClasses.map((e,i)=>( <span key={ i }>{ e } </span> )) }</h3>
      <h4>{ props.update }</h4>
      <p><b>{ props.eventCount }</b></p>
    </div>);
  return(
    <div className="eventful-counter">
       { moduleContent }
     </div>
  );
}

export default Counter;
