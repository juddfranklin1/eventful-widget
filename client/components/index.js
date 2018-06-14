/**
 * Global component
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSelectors } from '../actions';

import { wrap, unique } from '../lib/display-helpers';

import { Cookies } from 'react-cookie';

import WidgetToggle from './WidgetToggle';
import App from '../containers/App';

class Eventful extends Component {
  /*  Parent component
   *  Manages display status,
   *  active tab
   *  testing status
   **/

  constructor(props){
    super(props);

    this.state = {
      CookieObj: new Cookies(),
      hidden: false,// If set to false will default to exposed view. Defaults to true.
      alignment: 'left',// left, right, or bottom defaults to right
      isTesting: false, // If set to true, will display test components. Defaults to false.
    }
  }

  componentWillMount() {
  
    this.setState({
  
      cookies: this.state.CookieObj.getAll(),
      hidden: this.state.CookieObj.get("eventful_widget_hidden") === 'false' ? false : true
  
    });

    this.props.getSelectors();

  }

  onToggle(hidden) 
  {

    this.state.CookieObj.set("eventful_widget_hidden",this.state.hidden ? 'false' : 'true');
  
    this.setState({ "hidden": !this.state.hidden });
  
  }

  render() {
    return (

      <div className= {this.state.hidden ? "eventful-container hidden " + this.state.alignment : "eventful-container shown " + this.state.alignment }>
        <WidgetToggle onToggle={ this.onToggle.bind(this,this.state.hidden) } hidden={ this.state.hidden } />
        <App />
      </div>
    
    )
  }
}

const scrapeSelectors = function () {
  /**
   * Gathering all ids, classes, and tags used on the page.
   * 
   */
  const invisibleTags = [
      'NOSCRIPT',
      'SCRIPT',
      'META',
      'STYLE',
      'BASE',
      'COMMAND',
      'LINK',
      'TITLE',
  ]

  const ids = [].reduce.call(document.querySelectorAll('[id]'), function(acc, e) {
      return {type:'id', value: e.id};
  }, []);

  const trimWrap = wrap(String.prototype.trim);
  let classNames = [].reduce.call(document.querySelectorAll('[class]'), function(acc, e) {
      return e.getAttribute('class').split(' ').map(trimWrap).reduce(unique, acc);
  }, []);
  classNames = classNames.map(function(ele){
      return { type: 'class', value: ele };
  });


  const DOMWalker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_ELEMENT,
      { acceptNode: function(node) { if(invisibleTags.indexOf(node.tagName) === -1 && node.id !== 'eventful-root') return NodeFilter.FILTER_ACCEPT; } },
      false
  );

  const allElements = [];
      
  while(DOMWalker.nextNode()) allElements.push(DOMWalker.currentNode);

  const tagNames = [].reduce.call(allElements,function(acc,el){
          acc.push(el.tagName);
          return acc;
      },
      []);

  let uniqueElements = tagNames.reduce(unique,[]);

  uniqueElements = uniqueElements.map(function(ele){
      return { type: 'element', value: ele.toLowerCase() };
  });

  const selectors = [].concat(ids, classNames, uniqueElements);

  return selectors;
}

const mapStateToProps = state => ({
  selectors: scrapeSelectors()
});
  
const mapDispatchToProps = dispatch => ({
  getSelectors: () => dispatch(setSelectors(scrapeSelectors()))
});
  
export default connect(
mapStateToProps,
mapDispatchToProps
)(Eventful);
