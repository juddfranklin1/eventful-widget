import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Cookies } from 'react-cookie';

import { CSSTransitionGroup } from 'react-transition-group' // ES6

import TestGenerator from './TestGenerator.js';

export default class Options extends Component {
  constructor(props){
    super();

    this.state = {
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
      logEvent: props.logEvent || true

    }

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
        
        <p><button id="clearEventsButton" onClick={ () => this.props.clearEvents() }>Clear Existing Events</button></p>
        <label htmlFor="logEventCheckbox">Log Events to console? <input id="logEventCheckbox" type="checkbox" onClick={ ()=> { this.toggleLogEvent(); if(this.state.logEvent && 'checked="checked"'){}; }} /></label>
      </div>
    );
  }
}
