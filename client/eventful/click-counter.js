import React from 'react';
import ReactDOM from 'react-dom';

const ClickCounter = function(props){
  return(
    <div className="eventful-click-counter">
       <h3>Classes Tracked: { props.targetClasses.map((e,i)=>( <span key={ i }>{ e } </span> )) }</h3>
       <h4>{ props.element }</h4>
       <p><b>{ props.clickCount }</b></p>
     </div>
  );
}

export default ClickCounter;
