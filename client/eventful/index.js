import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ToggleTab from './toggle-tab.js';
import ContentWrapper from './content-wrapper.js';

export default class Eventful extends Component {
  constructor(){
    super();
    this.state = {
      hidden: true,// If set to false will default to exposed view. Defaults to true.
      alignment: 'right',// left, right, or bottom defaults to right
      activeTab: 'home',
      isTesting: true // If set to true, will display test components. Defaults to false.
    }
  }

  onToggle(){
    this.setState({"hidden":!this.state.hidden});
  }

  render() {
    return (
      <div className= {this.state.hidden ? "eventful-container hidden " + this.state.alignment : "eventful-container shown " + this.state.alignment }>
        <ToggleTab onToggle={ this.onToggle.bind(this) } hidden={ this.state.hidden } />
        <ContentWrapper
          isTesting={ this.state.isTesting }
          className={ this.state.activeTab } />
      </div>
    )
  }
}
