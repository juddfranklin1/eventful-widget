/**
 * Global component
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { instanceOf } from 'prop-types';
import { Cookies } from 'react-cookie';

import ToggleTab from './toggle-tab.js';
import ContentWrapper from './content-wrapper.js';

export default class Eventful extends Component {
  /*  Parent component
   *  Manages display status,
   *  active tab
   *  testing status
   **/

  constructor(props){
    super();

    this.state = {
      CookieObj: new Cookies(),
      hidden: true,// If set to false will default to exposed view. Defaults to true.
      alignment: 'left',// left, right, or bottom defaults to right
      activeTab: 'home',// Ultimately this will determine the navigation within the UI
      isTesting: false, // If set to true, will display test components. Defaults to false.
    }
  }

  componentWillMount() {
  
    this.setState({
  
      cookies: this.state.CookieObj.getAll(),
      hidden: this.state.CookieObj.get("eventful_widget_hidden") === 'false' ? false : true
  
    });

  }

  onToggle(hidden) 
  {

    this.state.CookieObj.set("eventful_widget_hidden",this.state.hidden ? 'false' : 'true');
  
    this.setState({ "hidden": !this.state.hidden });
  
  }

  render() {
    return (

      <div className= {this.state.hidden ? "eventful-container hidden " + this.state.alignment : "eventful-container shown " + this.state.alignment }>
        <ToggleTab onToggle={ this.onToggle.bind(this,this.state.hidden) } hidden={ this.state.hidden } />
        <ContentWrapper className={ this.state.activeTab } />
      </div>
    
    )
  }
}
