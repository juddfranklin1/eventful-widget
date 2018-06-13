import React, { Component } from 'react';
import LatestUpdate from './LatestUpdate';
import CurrentlyTracking from './CurrentlyTracking';

class OverviewPanel extends Component {
    constructor(props){
        super(props);

        this.state = {
            
        }

    }

    render(){
        return (
            <section className="tracker-wrapper section">
                <h2>Overview Panel</h2>
                <LatestUpdate />
                <CurrentlyTracking />
            </section>
        );
    }
}

export default OverviewPanel;