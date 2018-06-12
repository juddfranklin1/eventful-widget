import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Cookies } from 'react-cookie';

import { CSSTransitionGroup } from 'react-transition-group' // ES6

import TestGenerator from '../TestGenerator/TestGenerator.js';

export default class Options extends Component {
  constructor(props){
    super();

    this.state = {

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

    // Each instance of Test Generator being clicked needs to also update the pageSelectors on the ContentContainer state.
    function TestElements(isTesting, onAddElement){//This just gives us some generated content to work with as needed.
      if(isTesting){
        return (
          <div id="test-elements" key="testElements-1">
            <h3>Add an element to test the tracking functionality</h3>
            <TestGenerator elementTag='div' elementId='' elementClass='test-1' />
            <TestGenerator elementTag='div' elementId='' elementClass='test-2' />
            <TestGenerator elementTag='input' elementType='text' elementClass='test-3' />
            <TestGenerator elementTag='input' elementType='checkbox' elementClass='test-3' />
            <TestGenerator elementTag='button' elementContent='click' />
            <TestGenerator elementTag='video' />
            <TestGenerator elementTag='audio' />
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
