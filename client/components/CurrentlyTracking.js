import React from 'react';
import CurrentlyTrackedItem from './CurrentlyTrackedItem';

const CurrentlyTracking = () => (
    <div className='currently-tracking block'>
        <h4>Currently Tracking</h4>
        <ul>
            <CurrentlyTrackedItem />
        </ul>
    </div>
);

export default CurrentlyTracking;