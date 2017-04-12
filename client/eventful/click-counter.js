import React from 'react';
import ReactDOM from 'react-dom';

const ClickCounter = function(props){
  return(
    <div className="eventful-click-counter">
       <h3>Here is a count of clicks on elements with the following classes: { props.targetClasses.map((e,i)=>( <span key={ i }>{ e } </span> )) }</h3>
       <h4>{ props.element }</h4>
       <p><b>{ props.clickCount }</b></p>
     </div>
  );
}

export default ClickCounter;
