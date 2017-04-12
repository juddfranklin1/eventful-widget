import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import ClickCounter from './click-counter.js';

const TrackerWrapper = function(props){
    return(
      <div className="tracker-wrapper section">
        <ClickCounter
          targetClasses={ props.selectedClasses }
          clickCount={ props.counter }
          element={ props.activeElement } />
      </div>
    );
}
export default TrackerWrapper