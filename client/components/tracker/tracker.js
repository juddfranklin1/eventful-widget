import React from 'react';


import Counter from '../Counter/Counter.js';

const Tracker = function(props) {

  return(
      <div className='tracker-wrapper section'>
        <h2>Tracker</h2>

        <Counter
          removeTracking={ props.removeTracking }
          targetSelectors={ props.selectedSelectors }
          event={ props.lastEvent }
          update={ props.latestUpdate } />
      </div>
    );
}
export default Tracker
