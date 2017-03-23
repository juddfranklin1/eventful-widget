import React from 'react';
import ReactDOM from 'react-dom';

const ClickCounter = function(props){
  return(
    <div className="eventfulClickCounter">
       <h3>Here is a count of clicks on elements with className "{ props.targetClass }"</h3>
       <h4>{ props.element }</h4>
       <p><b>{ props.clickCount }</b></p>
     </div>
  );
}

export default ClickCounter;
