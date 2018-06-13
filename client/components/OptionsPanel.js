import React, { Component } from 'react';
import ElementAdder from './ElementAdder';

class OptionsPanel extends Component {
    constructor(props){
        super(props);

        this.state = {
            elements: [
                {
                    elementTag: 'div',
                    elementId: '',
                    elementClass: 'test-1'
                },
                {
                    elementTag: 'input',
                    elementType: 'checkbox'
                },
                {
                    elementTag: 'input',
                    elementType: 'text'
                },
                {
                    elementTag: 'div',
                },
                {
                    elementTag: 'audio',
                },
                {
                    elementTag: 'video',
                },
                {
                    elementTag: 'textarea',
                },
                {
                    elementTag: 'button',
                },
                {
                    elementTag: 'form',
                },
                {
                    elementTag: 'table'
                }
                
            ]
        }

    }

    render(){
        return (
            <section className="tracker-wrapper section">
                <h2>Options Panel</h2>
                <section>
                    { this.state.elements.map((e, i)=>( <ElementAdder key={ i } elementType={ e.elementType } elementTag={ e.elementTag } /> )) }
                </section>
                <ul>
                    <li>Set Notation (console logging, event location marking, data export, database connection details)</li>
                    <li>Clear Data</li>
                    <li>Enable/Disable Cookies or local storage</li>
                </ul>
            </section>
        );
    }
}

export default OptionsPanel;