import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import Counter from './counter.js';

const TrackerWrapper = function(props){
    return(
      <div className='tracker-wrapper section'>
        <h2>Tracker</h2>
        <Counter
          targetClasses={ props.selectedClasses }
          eventCount={ props.counter }
          event={ props.lastEvent }
          element={ props.activeElement } />
      </div>
    );
}
export default TrackerWrapper