import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ToggleTab from './toggle-tab.js';
import WidgetWrapper from './widget-wrapper.js';

export default class Eventful extends Component {
  constructor(){
    super();
    this.state = {
      counter: 0,
      hidden: false,
      element: '',
      pageClasses: [],
      selectedClasses: [],
      activeTab: 'home'
    }
  }

  /* Let's abstract this function
   * to delegate different event types.
   * Once there's an API, this should POST event details to the DB.
   * */  
  EventDelegator(eventType,newClass){
    let evt = eventType || 'click';
    let that = this;
    const targetClasses = Array.of(newClass) || this.state.selectedClasses;
    targetClasses.map(function(targetClass){
      console.log(targetClass);
      document.getElementsByTagName('body')[0].addEventListener(evt, function(e) {
        var failsFilter = true,
          el = e.target;
          console.info(el !== this && (failsFilter = el.className.indexOf(targetClass) === -1) && (el = el.parentNode));
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
  countEm(event) {
    let element = event.target;
    let description = 'you just clicked on a ' + element.tagName + ' element';
    if (typeof(element.innerHTML) === 'string') {
      description += ' with the class ' + element.innerHTML
    }
    this.setState({
      counter: this.state.counter+1,
      activeElement: description
    });
    return true;
  };

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
      pageClasses: classNames
    });
    return;
  }

  componentDidMount(){
    /* This might warrant a default tracking by calling
     * EventDelegator wrapped in a timeout.
     * The tracking could check for a cookie or query an API
     * For saved or previously tracked items.
     * 
     */
  }

  onAddElement(sel){//Currently sel is only a class, but it should be more generic.
    let selector = sel || '';
    let TestElement = document.createElement('div');
    let TestInnerElement = document.createElement('div');
    TestInnerElement.innerHTML = 'New Element to Click';
    TestElement.appendChild(TestInnerElement);
    TestElement.className = selector;
    document.querySelector('body').append(TestElement);
  }

  onSelectClass(toAdd){
    let currentlySelected = this.state.selectedClasses;
    currentlySelected.push(toAdd);
    this.setState({
      selectedClasses : currentlySelected
    });
    (this.EventDelegator.bind(this,'click',toAdd))(this);
  }

  onToggle(){
    this.setState({"hidden":!this.state.hidden});
  }

  render() {
    return (
      <div className= {this.state.hidden ? "eventful-container hidden" : "eventful-container shown" }>
        <ToggleTab onToggle={ this.onToggle.bind(this) } />
        <WidgetWrapper
          className={ this.state.activeTab }
          counter={ this.state.counter }
          activeElement={ this.state.activeElement }
          addElement={ (sel) => this.onAddElement(sel) }
          selectedClasses={ this.state.selectedClasses }
          pageClasses={ this.state.pageClasses }
          selectClass={ (toAdd) => this.onSelectClass(toAdd) }
        />
      </div>
    )
  }
}
