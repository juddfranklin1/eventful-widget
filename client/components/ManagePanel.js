import React, { Component } from 'react';
import CurrentlyTracking from './CurrentlyTracking';


class ManagePanel extends Component {
    constructor(props){
        super(props);

        this.state = {
            
        }

    }

    render(){
        return (
            <section className="tracker-wrapper section">
                <h2>Tracking Panel</h2>
                <h3>Manage your tracking here.</h3>
                <CurrentlyTracking />
                <ul>
                    <li>Add by Selector</li>
                    <li>Add by Event</li>
                </ul>
            </section>
        );
    }
}

export default ManagePanel;