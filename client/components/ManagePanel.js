import React from 'react';
import CurrentlyTracking from './CurrentlyTracking';
import { highlightElements } from '../containers/ManagePanel';

const ManagePanel = props => {
    return (
        <section className="tracker-wrapper section">
            <h2>Tracking Panel</h2>
            <h3>Manage your tracking here.</h3>
            <CurrentlyTracking />
            <ul>
                <li>Add by Selector 
                    <ul>
                        { props.selectors.map((el, i) => (<li key={ i }><a onClick={ highlightElements.bind(this, el) }>{ el.value }</a></li>)) }
                    </ul>
                </li>
                <li>Add by Event</li>
            </ul>
        </section>
    );
}

export default ManagePanel;