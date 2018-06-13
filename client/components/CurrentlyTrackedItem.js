import React from 'react';
import { selectorProcessor } from '../lib/display-helpers.js';

const CurrentlyTrackedItem = function(props) {
    return (
        <li>
            Tracking _________ events on ______________ elements; <a className='remove-tracking'>x</a>
        </li>
    );
};

export default CurrentlyTrackedItem;