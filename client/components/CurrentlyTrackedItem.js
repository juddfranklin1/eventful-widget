import React from 'react';
import { selectorProcessor } from '../lib/display-helpers.js';

const CurrentlyTrackedItem = function(props) {
    return (
        <li>
            { props.e.selector } tracking { props.e.event } - { props.e.count } <a className="remove-tracking" id={ 'remove-' + props.e.event + selectorProcessor(props.e.selector) } onClick={ (event) => props.removeTracking( props.e.event, props.e.selector ) }>x</a>
        </li>
    );
};

export default CurrentlyTrackedItem;