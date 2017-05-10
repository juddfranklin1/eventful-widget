import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import Counter from './counter.js';

const TrackerWrapper = function(props){
    return(
      <div className={ props.activeTab === 'tracker' ? 'tracker-wrapper section shown' : 'tracker-wrapper section hidden' }>
        <h2>Tracker</h2>
        <Counter
          targetClasses={ props.selectedClasses }
          clickCount={ props.counter }
          element={ props.activeElement } />
      </div>
    );
}
export default TrackerWrapper