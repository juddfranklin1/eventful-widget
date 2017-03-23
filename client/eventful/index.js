import React from 'react';
import ReactDOM from 'react-dom';

import ClickCounter from './click-counter.js';
import ToggleTab from './toggle-tab.js';
import ElementAdder from './add-element.js';

export default class Eventful extends React.Component {
  constructor(){
    super();
    this.state = {
      counter: 0,
      targetClass: "square",
      hidden: true,
      element: '',
    }
  }

  /* Let's abstract this function
   * to delegate different event types.
   * Once there's an API, this should POST event details to the DB.
   * */  
  EventDelegator(eventType){
    let evt = eventType || 'click';
    let that = this;
    const targetClass = this.state.targetClass;
    let runDelegator = window.setTimeout(function(){
      /* Ideally this block wouldn't need to target the body element.
       * Not really sure how I would be able to create live functionality
       * without targeting the most general element available.
       * */
      document.getElementsByTagName('body')[0].addEventListener(evt, function(e) {
        var failsFilter = true,
          el = e.target;
        while (el !== this && (failsFilter = el.className.indexOf(targetClass) === -1) && (el = el.parentNode));
        if (!failsFilter) {
          let elements = document.querySelectorAll('.'+targetClass);
          Array.from(elements).forEach(function(element){
            if(!element.hasAttribute('eventful-tracked-' + evt)){//protect against duplicate event listener
              element.addEventListener(evt,that.countEm.bind(that),false);
              element.setAttribute('eventful-tracked-' + evt,'true');
            }
          });
        }
      },true);
    },50);
  }
  /* Let's abstract this function
   * to count different event types.
   * Once there's an API, this should POST event details to the DB.
   * */
  countEm(event) {
    let element = event.target;
    let description = 'you just clicked on a ' + element.tagName + ' element';
    if (typeof(element.innerHTML) === 'string') {
      description += ' with the content ' + element.innerHTML
    }
    this.setState({
      counter: this.state.counter+1,
      activeElement: description
    });
    return true;
  };

  onToggle(){
    this.setState({"hidden":!this.state.hidden});
  }

  componentDidMount(){
    this.EventDelegator('click');
  }

  /* Let's refine this function to take arguments
   * to create custom elements.
   * It should also note the event attributes on the element
   * and append the event types to the text node.
   * */
  addElement(){
    let TestZone = document.getElementById('test-content');
    let TestElement = document.createElement('div');
    let TestInnerElement = document.createElement('div');
    TestInnerElement.innerHTML = 'New Element to Click';
    TestElement.appendChild(TestInnerElement);
    TestElement.className = 'square';
    TestZone.append(TestElement);
  }

  render() {
    return (
      <div className= {this.state.hidden ? "eventful-container hidden" : "eventful-container shown" }>
        <ToggleTab onToggle={ this.onToggle.bind(this) } />
        <ClickCounter clickCount={ this.state.counter } element={ this.state.activeElement } targetClass={ this.state.targetClass } className="eventfulClickCounter" />
        <ElementAdder onClick={ this.addElement.bind(this) } />
      </div>
    )
  }
}
