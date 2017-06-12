import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Cookies } from 'react-cookie';

import TestElement from './test-element.js';
import PickASelector from './pick-a-selector.js';

export default class OptionsWrapper extends Component {
  constructor(props){
    super();
  }

  render(){
    function TestElements(props){//This just gives us some generated content to work with as needed.
      if(props.isTesting){
        return (
          <div>
            <TestElement elementName='test-1' onClick={ (name) => props.addElement(name) } />
            <TestElement elementName='test-2' onClick={ (name) => props.addElement(name) } />
          </div>
        );
      }
      return <div />;
    }
    return(
      <div className={ this.props.activeTab === 'options' ? 'options-wrapper section shown' : 'options-wrapper section hidden' }>
        <h2>Options</h2>
        <button content="Test" onClick={ ()=> this.props.toggleTesting() }>Toggle Test</button>
        <TestElements addElement={this.props.addElement} isTesting={ this.props.isTesting } />
        <PickASelector
          selectedClasses={ this.props.selectedClasses }
          pageClasses={ this.props.pageClasses }
          selectClass={ (sel) => this.props.selectClass(sel) } />
      </div>
    );
  }
}