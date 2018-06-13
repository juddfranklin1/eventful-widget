import React, { Component } from 'react';


class OptionsPanel extends Component {
    constructor(props){
        super(props);

        this.state = {
            
        }

    }

    render(){
        return (
            <section className="tracker-wrapper section">
                <h2>Options Panel</h2>
                <ul>
                    <li>Add Elements</li>
                    <li>Set Notation (console logging, event location marking, data export, database connection details)</li>
                    <li>Clear Data</li>
                    <li>Enable/Disable Cookies or local storage</li>
                </ul>
            </section>
        );
    }
}

export default OptionsPanel;