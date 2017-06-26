import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Cookies } from 'react-cookie';

import { CSSTransitionGroup } from 'react-transition-group' // ES6

import TestElement from './test-element.js';

export default class OptionsWrapper extends Component {
  constructor(props){
    super();

    this.state = {

      isTesting: false,
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
    function TestElements(isTesting, onAddElement){//This just gives us some generated content to work with as needed.
      if(isTesting){
        return (
          <div id="test-elements" key="testElements-1">
            <h3>Add an element to test the tracking functionality</h3>
            <TestElement elementName='test-1' />
            <TestElement elementName='test-2' />
          </div>
        );
      }
      return <div />;
    }
    return(
      <div className='options-wrapper section' >
        <h2>Options</h2>
        <button content="Test" onClick={ ()=> this.toggleTesting() }>Toggle Test</button>
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500} >
          { TestElements(this.state.isTesting, this.onAddElement) }
        </CSSTransitionGroup>
        <label htmlFor="logEventCheckbox">Log Events to console? <input id="logEventCheckbox" type="checkbox" onClick={ ()=> { this.toggleLogEvent(); if(this.state.logEvent && 'checked="checked"'){}; }} /></label>
      </div>
    );
  }
}
