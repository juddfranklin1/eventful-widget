import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AddElement from './add-element.js';
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
            <AddElement elementName='merp' onClick={ (name) => props.addElement(name) } />
            <AddElement elementName='derp' onClick={ (name) => props.addElement(name) } />
          </div>
        );
      }
      return <div />;
    }
    return(
      <div className="options-wrapper section">
        <h2>Options</h2>
        <TestElements addElement={this.props.addElement} isTesting={ this.props.isTesting } />
        <PickASelector
          selectedClasses={ this.props.selectedClasses }
          pageClasses={ this.props.pageClasses }
          selectClass={ (sel) => this.props.selectClass(sel) } />
      </div>
    );
  }
}