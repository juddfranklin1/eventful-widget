import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import OptionsWrapper from './options-wrapper.js';
import TrackerWrapper from './tracker-wrapper.js';
import Navigation from './navigation.js';

export default class ContentWrapper extends Component {
  /* This class will contain all the inner workings of the Widget
   * Its chief role will be to manage which view of the widget is Active.
   * The current idea for the widget would be to provide a few sub-interfaces.
   * 1) A default interface (accessed by a house icon): a cookie can be set to keep this at the last state.
   *    a. This interface should give users the ability to track their previously tracked elements and events.
   *    b. It should also provide a nice overview of data tracked.
   *        i. Specifically, it should note the number of elements tracked, the number of events that have been registered, etc.
   * 2) An options interface (gear or wrench icon)
   *    a. This interface would allow a user to toggle test mode,
   *       which would turn on or off the ability to generate elements to track events.
   * 3) Add tracker interface (accessed by a plus sign icon)
   *    a. allowing a user to track a particular selector for a specific event
   *    b. The user should be able to pick from selectors farmed from the current page, or to add their own via text input
   *       (a validator function can confirm that the selector returns results on a page or warn if no elements are found.).
   *    c. To make this possible, this would need to be a form with a dropdown, and a text input submitted via a button click event.
   * 4) Each event should have its own tracking ingterface.
   *    This would be generated from an abstract component.
  */
  constructor(props){
    super();
    this.state = {
      counter: 0,
      element: '',
      pageClasses: [],
      activeTab: 'tracker',
      selectedClasses: [],
      clonedChildren: []
    }
  }

  // component methods

  onAddElement(sel){//Currently sel is only a class, but it should be more generic.
    let selector = sel || '';
    let TestElement = document.createElement('div');
    TestElement.innerHTML = 'New ' + sel +' Element to Click';
    TestElement.className = selector;
    document.querySelector('body').append(TestElement);
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

  updateCounter(text, el){
    this.setState({
      counter: this.state.counter + 1,
      activeElement: text
    });
    return;
  }

  onSelectClass(toAdd){
    let currentlySelected = this.state.selectedClasses;
    if(currentlySelected.indexOf(toAdd) === -1){
      currentlySelected[currentlySelected.length] = toAdd;
      this.setState({
        selectedClasses: currentlySelected
      });
      (this.delegateEvent.bind(this,'click',toAdd))(this);
    }
  }

  /* Let's abstract this function
   * to delegate different event types.
   * Once there's an API, this should POST event details to the DB.
   * */  
  delegateEvent(eventType,newClass){
    let evt = eventType || 'click';
    let that = this;
    const targetClasses = Array.of(newClass) || this.state.selectedClasses;
    targetClasses.map(function(targetClass){
      document.getElementsByTagName('body')[0].addEventListener(evt, function(e) {
        var failsFilter = true,
          el = e.target;
        while (el !== this && (failsFilter = el.className.indexOf(targetClass) === -1) && (el = el.parentNode));
        if (!failsFilter) {
          if(!el.hasAttribute('eventful-tracked-' + evt)){//protect against duplicate event listener
            el.addEventListener(evt,that.countEm.bind(that),false);
            el.setAttribute('eventful-tracked-' + evt,'true');
          }
        }
      },true);
    });
  }

  /* Let's abstract this function
   * to count different event types.
   * Once there's an API, this should POST event details to the DB.
   * */
  countEm(event,props) {
    let element = event.target;
    let description = 'Last tracked event: '+ event.type + ' on ' + element.tagName.toLowerCase();
    if (typeof(element.innerHTML) === 'string') {
      description += '.' + element.className + '.';
    }
    this.updateCounter(description);
    return true;
  };

  componentDidMount(){
    /* This might warrant a default tracking by calling
     * EventDelegator wrapped in a timeout.
     * The tracking could check for a cookie or query an API
     * For saved or previously tracked items.
     * 
     */
  }

  changeTab(tab){
    this.setState({
      activeTab: tab
    });
  }

  render(){
    return (
      <div className="eventful-content-wrapper">
        <Navigation
          changeTab={ this.changeTab.bind(this) }
          activeTab={ this.state.activeTab } />
        <TrackerWrapper
          activeTab={ this.state.activeTab }
          counter={ this.state.counter }
          activeElement={ this.state.activeElement }
          selectedClasses={ this.state.selectedClasses } />
        <OptionsWrapper
          activeTab={ this.state.activeTab }
          isTesting={ this.props.isTesting }
          pageClasses={ this.state.pageClasses }
          addElement={ this.onAddElement }
          selectedClasses={ this.state.selectedClasses }
          selectClass={ this.onSelectClass.bind(this) }
          toggleTesting={ this.props.toggleTesting.bind(this) } />
      </div>
    );
  }
}