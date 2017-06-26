import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import PickASelector from './pick-a-selector.js';

/* The component where we will be able to track new elements or new events */

export default class AddTrackingWrapper extends Component {
  constructor(props){
    super();
    this.state = {

    }
  }
  
  /* Let's abstract this function
   * to delegate different event types.
   * Once there's an API, this should POST event details to the DB.
   * */  
  delegateEvent(eventType,newClass){
    const evt = eventType || 'click';
    const that = this;
    const targetClasses = Array.of(newClass) || this.state.selectedClasses;

    targetClasses.map(function(targetClass) 
    {
      document.getElementsByTagName('body')[0].addEventListener(evt, function(e) {
        var failsFilter = true,
          el = e.target;
        while (el !== this && (failsFilter = el.className.indexOf(targetClass) === -1) && (el = el.parentNode));
        if (!failsFilter) {
          if(!el.hasAttribute('eventful-tracked-' + evt)){//protect against duplicate event listener
            el.addEventListener(evt, that.countEm.bind(that), { capture: false, once: false, passive: true });
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
    console.log(event);
    let element = event.target;
    let description = 'Last tracked event: '+ event.type + ' on ' + element.tagName.toLowerCase();
    if (typeof(element.innerHTML) === 'string') {
      description += '.' + element.className + '.';
    }
    this.props.updateCounter(description);
    return true;
  };

  onSelectClass(toAdd,evt){
    let currentlySelected = this.props.selectedClasses;
    
    if(currentlySelected.indexOf(toAdd) === -1){
    
      currentlySelected[currentlySelected.length] = toAdd;
    
      this.setState({
    
        selectedClasses: currentlySelected
    
      });
  
      (this.delegateEvent.bind(this, evt, toAdd))(this);

    }

  }

  render() {
    return (
      <div className='add-wrapper section'>
        
        <h2>Add Tracking</h2>
        <h3>Pick some classes to track events on.</h3>
        <PickASelector
          selectedClasses={ this.props.selectedClasses }
          pageClasses={ this.props.pageClasses }
          eventName="click"
          selectClass={ (sel, evt) => this.onSelectClass(sel, 'click') } />

        <PickASelector
          selectedClasses={ this.props.selectedClasses }
          pageClasses={ this.props.pageClasses }
          eventName="mouseenter"
          selectClass={ (sel, evt) => this.onSelectClass(sel, 'mouseenter') } />


      </div>
    );
  };
}
