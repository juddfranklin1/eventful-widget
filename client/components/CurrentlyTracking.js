import React from 'react';

import CurrentlyTrackedItem from './CurrentlyTrackedItem';

const CurrentlyTracking = function(props){

    return (
        <section className='currently-tracking'>
        <h3>Currently Tracking</h3>
        <ul>
          { props.selectedSelectors.map((e, i)=>( <CurrentlyTrackedItem key={ i } e={ e } event={ props.event } removeTracking={ props.removeTracking.bind(this) } /> )) }
        </ul>
      </section>
    );
}

export default CurrentlyTracking;