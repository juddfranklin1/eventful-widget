import React, { Component } from 'react';

import TestGenerator from './TestGenerator.js';

export default class Options extends Component {
  constructor(props){
    super();

    this.state = {
      /**
       * Test Elements
       * System for generating elements:
       * Give the user the ability to create different sorts of elements.
       * Give them the option to set classnames, ids, attributes, etc.
       * Also, generate data attributes that allows us to hide these elements from 
       * 
       */

      elements: [
        { tag: 'div', class: 'eventful-test-div test-1', content: '', id: '' },
        { tag: 'div', class: 'eventful-test-div test-2', content: '', id: '' },
        { tag: 'input', class: 'eventful-test-input', type: 'text', content: 'click', id: '' },
        { tag: 'input', class: 'eventful-test-input', type: 'checkbox', content: 'click', id: '' },
        { tag: 'button', class: 'eventful-test-content', content: 'test button', id: '' },
        { tag: 'textarea', class: 'eventful-test-textarea', content: '', id: '' },
        { tag: 'video', class: 'eventful-test-video', content: '', id: '', attributes: [{key: 'controls'}, {key: 'src', val: 'https://youtu.be/1IJPQIYcAxQ'}] },
        { tag: 'audio', class: 'eventful-test-audio', content: '', id: '' },
        { tag: 'a', class: 'eventful-test-link', content: 'test link', id: '', attributes: [{key: 'href', val: 'juddfranklin.com'}, {key: 'target', val: '_self'}] },
      ],
      isTesting: true,

    }

  }

  toggleTrackWindowEvents(bool) {
    this.props.setTrackWindowEvents(bool);
    return bool;
  }

  toggleTesting() {
    this.setState({ "isTesting": !this.state.isTesting });
  }

  toggleMarkEvent(bool) {
    this.props.setMarkEvent(bool);
    return bool;
  }

  toggleLogEvent(bool){
    this.props.setLogEvent(bool);
    return bool;
  }

  render(){
    const that = this;
    // Each instance of Test Generator being clicked needs to also update the pageSelectors on the ContentContainer state.
    function TestElements(isTesting, onAddElement){//This just gives us some generated content to work with as needed.
      if(isTesting){
        return (
          <div id="test-elements" key="testElements-1">
            <h3>Add an element to test the tracking functionality</h3>
            { that.state.elements.map(function(el, ind){
              return (
                <TestGenerator
                  key={ ind }
                  elementTag= { el.tag }
                  elementId= { el.id }
                  elementClass= { el.class }
                  elementContent= { el.content }
                  elementType={ el.type }
                  elementAttributes={ el.attributes }
                />
              );  
            }) }
          </div>
        );
      }
      return <div />;
    }

    return(
      <div className='options-wrapper section' >
        <h2>Options</h2>
        
        { TestElements(this.state.isTesting, this.onAddElement) }

        <ul>
          <li><button id="clearEventsButton" onClick={ () => this.props.clearEvents() }>Clear Existing Events</button></li>
          <li><label htmlFor="trackWindowEventsCheckbox">Track window events? <input id="trackWindowEventsCheckbox" type="checkbox" defaultChecked={ this.props.trackWindowEvents } onChange={ ()=> { this.toggleTrackWindowEvents(!this.props.trackWindowEvents); }} /></label></li>
          <li><label htmlFor="logEventCheckbox">Log Events to console? <input id="logEventCheckbox" type="checkbox" defaultChecked={ this.props.logEvent } onChange={ ()=> { this.toggleLogEvent(!this.props.logEvent); }} /></label></li>
          <li><label htmlFor="markEventCheckbox">Mark events where they occur? <input id="markEventCheckbox" type="checkbox" defaultChecked={ this.props.markEvent } onChange={ ()=> { this.toggleMarkEvent(!this.props.markEvent); }} /></label></li>
        </ul>
      </div>
    );
  }
}
