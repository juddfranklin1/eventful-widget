import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import Counter from '../Counter/Counter.js';

const Tracker = function(props){

  return(
      <div className='tracker-wrapper section'>
        <h2>Tracker</h2>

        <Counter
          targetSelectors={ props.selectedSelectors }
          eventCount={ props.counter }
          event={ props.lastEvent }
          update={ props.latestUpdate } />
      </div>
    );
}
export default Tracker
