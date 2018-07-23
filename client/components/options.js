import React, { Component } from 'react';

import { Cookies } from 'react-cookie';

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
        { tag: 'div', class: 'test-div test-1', content: '', id: '' },
        { tag: 'div', class: 'test-div test-2', content: '', id: '' },
        { tag: 'input', class: 'test-input', type: 'text', content: 'click', id: '' },
        { tag: 'input', class: 'test-input', type: 'checkbox', content: 'click', id: '' },
        { tag: 'button', class: 'test-content', content: 'test button', id: '' },
        { tag: 'textarea', class: 'test-textarea', content: '', id: '' },
        { tag: 'video', class: 'test-video', content: '', id: '', attributes: [{key: 'controls'}, {key: 'src', val: 'https://youtu.be/1IJPQIYcAxQ'}] },
        { tag: 'audio', class: 'test-audio', content: '', id: '' }
      ],
      isTesting: true,
      logEvent: props.logEvent || true,
      trackWindowEvents: props.trackWindowEvents || false

    }

  }

  toggleTrackWindowEvents() {
    var htmlEl = document.getElementsByTagName('html')[0];
    if(!this.state.trackWindowEvents) {
      htmlEl.setAttribute('data-eventful_track_window_events','true');
      
      window.basicTrack = function(e) {
        if (htmlEl.hasAttribute('data-eventful_track_window_events')) {
          return function(e) {
            console.log(e);
          }
        }
      }
      window.addEventListener('resize', window.basicTrack());
      window.addEventListener('hashchange', window.basicTrack());
      window.addEventListener("beforeunload", function (e) {
        if (htmlEl.hasAttribute('data-eventful_track_window_events')) {
          var confirmationMessage = "\\o/";
          console.log(e);
          (e || window.event).returnValue = confirmationMessage;     //Gecko + IE
          return confirmationMessage;                                //Webkit, Safari, Chrome etc.
        }
      });
    } else {
      htmlEl.removeAttribute('data-eventful_track_window_events');
    }
    this.setState({ "trackWindowEvents": !this.state.trackWindowEvents });
  }

  toggleTesting() {
  
    this.setState({ "isTesting": !this.state.isTesting });
  
  }

  toggleLogEvent(){

    this.setState({ "logEvent": !this.state.logEvent });
    this.props.setLogEvent(this.state.logEvent);
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
          <li><label htmlFor="logEventCheckbox">Log Events to console? <input id="logEventCheckbox" type="checkbox" onClick={ ()=> { this.toggleLogEvent(); if(this.state.logEvent && 'checked="checked"'){}; }} /></label></li>
          <li><label htmlFor="trackWindowEventsCheckbox">Track window events? <input id="trackWindowEventsCheckbox" type="checkbox" onClick={ ()=> { this.toggleTrackWindowEvents(); if(this.state.trackWindowEvents && 'checked="checked"'){}; }} /></label></li>
        </ul>
      </div>
    );
  }
}
