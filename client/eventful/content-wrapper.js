import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import OptionsWrapper from './options-wrapper.js';
import TrackerWrapper from './tracker-wrapper.js';
import AddTrackingWrapper from './add-tracking-wrapper.js'; 
import Navigation from './navigation.js';

export default class ContentWrapper extends Component {
  /*  This component does too much.
   *  It should simply contain and bridge the 3 primary internal components
   *  Navigation - Gives the ability to toggle between the tracker and options tabs
   *    - Cookie for maintaining last state
   *  Tracker - Where the magic happens...
   *    - This sub-component should contain a running record of the elements and events to be tracked
   *    - Should offer global and detail views that drill down into event and element data.
   *  Options (Gear or wrench icon)
   *    - toggle test mode
   *      - which would turn on or off the ability to generate elements to track events.
   *  Add tracker interface (accessed by a plus sign icon)
   *    a. allowing a user to track a particular selector for a specific event
   *    b. The user should be able to pick from selectors farmed from the current page, or to add their own via text input
   *       (a validator function can confirm that the selector returns results on a page or warn if no elements are found.).
   *    c. To make this possible, this would need to be a form with a dropdown, and a text input submitted via a button click event.
   *  Each event should have its own tracking interface.
   *    This would be generated from an abstract component.
  */
  constructor(props){
    super();
    this.state = {
      counter: 0,
      element: '',
      pageClasses: [],
      activeTab: 'tracker',
      latestUpdate: 'No events tracked yet',
      selectedClasses: [],
      clonedChildren: [],
      logEvent: false
    }
  }

  // Lifecycle Events

  componentWillMount(){

    let classyElements = document.querySelectorAll('[class]');

    let unique = function (list, x) {
      if (x != "" && list.indexOf(x) === -1) {
          list.push(x);
      }
      return list;
    };
    let trim = function (x) { return x.trim(); };
    let classNames = [].reduce.call(classyElements, function (acc, e) {
      return e.className.split(' ').map(trim).reduce(unique,acc);
    }, []);


    this.setState({
      pageClasses: classNames,
    });

    return;

  }

  componentDidMount() {
    /* This might warrant a default tracking by calling
     * EventDelegator wrapped in a timeout.
     * The tracking could check for a cookie or query an API
     * For saved or previously tracked items.
     * 
     */
  }

  updateCounter(text, evt, el){
    let coords = {left: evt.screenX + 'px', top: evt.screenY + 'px'};
    let eventMarker = document.createElement('span');
    eventMarker.style.top = evt.clientY;
    eventMarker.setAttribute('style','left: ' + evt.clientX + 'px; top: ' + evt.clientY + 'px')
    eventMarker.style.left = evt.clientX;
    eventMarker.classList.add('event-marker');
    el.appendChild(eventMarker);
    if (this.state.logEvent){
      console.info(evt);
      console.info(el);
    }
    this.setState({
      counter: this.state.counter + 1,
      latestUpdate: text
    });
    return;
  
  }

  changeTab(tab) {
    this.setState({
      activeTab: tab
    });
    return;
  }

  setLogEvent(doLog){
    this.setState({
      logEvent: doLog,
    });
    return;
  
  }

  render(){

    let activeTabContent = null; 

    if (this.state.activeTab === "add") {
      
      activeTabContent = <AddTrackingWrapper
          pageClasses={ this.state.pageClasses }          
          selectedClasses={ this.state.selectedClasses }
          updateCounter={ this.updateCounter.bind(this) }
          logEvent={ this.state.logEvent } />;

    } else if (this.state.activeTab === "options") {
      
      activeTabContent = <OptionsWrapper
          pageClasses={ this.state.pageClasses }
          selectedClasses={ this.state.selectedClasses }
          setLogEvent={ this.setLogEvent.bind(this) }
          logEvent={ this.state.logEvent } />;

    } else {
      
      activeTabContent = <TrackerWrapper
          counter={ this.state.counter }
          latestUpdate={ this.state.latestUpdate }
          selectedClasses={ this.state.selectedClasses }
          logEvent={ this.state.logEvent } />;

    }

    return (
      <div className="eventful-content-wrapper">
        
        <Navigation
          changeTab={ this.changeTab.bind(this) }
          activeTab={ this.state.activeTab } />
        
        { activeTabContent }
        
      </div>
    );
  }
}
