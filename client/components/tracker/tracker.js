import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import Counter from '../counter/counter.js';

const Tracker = function(props){
    return(
      <div className='tracker-wrapper section'>
        <h2>Tracker</h2>
        <Counter
          targetClasses={ props.selectedClasses }
          eventCount={ props.counter }
          event={ props.lastEvent }
          update={ props.latestUpdate } />
      </div>
    );
}
export default Tracker
