import React,{Component} from 'react';

import { selectorProcessor } from '../../lib/display-helpers.js';
import Select from 'react-select';
import SelectorPicker from '../SelectorPicker/SelectorPicker.js';

/* The component where we will be able to track new elements or new events */

export default class TrackingAdder extends Component {
  constructor(props) {
    super();
    this.state = {
      chosenEvent: '',
      eventOptions: [
        // expand this array as event groups expand
        // https://developer.mozilla.org/en-US/docs/Web/Events
        {
          eventGroup: 'mouse',
          events: [
            'click',
            'mouseenter',
            'mouseleave',
            'mousedown',
            'mouseup',
            'dblclick',
            'mouseover',
            'mouseout',
            'contextmenu'
          ]
        },
        {
          eventGroup: 'input',
          events: [
            'change',
            'input',
            'cut',
            'copy',
            'paste'
          ]

        },
        {
          eventGroup: 'keyboard',
          events: [
            'keydown',
            'keyup',
            'keypress',
            'input',
          ]
        },
        {
          eventGroup: 'media',
          events: [
            'playing',
            'waiting',
            'seeking',
            'seeked',
            'ended',
            'loadedmetadata',
            'loadeddata',
            'canplay',
            'canplaythrough',
            'durationchange',
            'timeupdate',
            'play',
            'pause',
            'ratechange',
            'volumechange',
            'suspend',
            'emptied',
            'stalled',
          ]
        },
        {
          eventGroup: 'progress',
          events: [
            'loadstart',
            'progress',
            'error',
            'abort',
            'load',
            'loadend'
          ]
        }
        // etc...
      ],
    }
  }
 
  /**
   * @name delegator
   * 
   * @argument {Element} scope
   * @argument {String} selector
   * @argument {Funcion} countEvent
   * 
   * @description function to be called when delegating events to be tracked.
   */

  delegator(scope, selector, countEvent, remove=false){
    const that = this;

    return function(e) {
      let failsFilter = true, // flag
        el = e.target;

      // Checking for matching elements based upon element attributes
      var check = selectorProcessor(selector, el);

      while (el !== scope && (failsFilter = check === -1) && (el = el.parentNode)); // tree walker

      if (!failsFilter) {
        if(!el.hasAttribute('eventful-tracked-' + e.type)){ // protect against duplicate event listener

          scope.sel = selector;
          if(remove) {
            console.log(el);
            el.removeEventListener(e.type, countEvent);
            console.log(el['on' + e.type]);
            el.removeAttribute('eventful-tracked-' + e.type);
          } else {
            el.addEventListener(e.type, countEvent, { capture: false, once: false, passive: true });
            el.setAttribute('eventful-tracked-' + e.type,'true');
          }
          
          if(!document.querySelector('[remove-eventful-tracked-' + e.type + ']')){
            const removeEl = document.createElement('span');
            removeEl.setAttribute('remove-eventful-tracked-' + e.type,'true')
            removeEl.addEventListener('click', (e) => that.delegator(scope, selector, countEvent, true), { capture: false, once: false, passive: true });
            document.body.appendChild(removeEl);
          }
        }
      }
    }
  }

  /**
   * @name delegateEvent
   * 
   * @param {String} eventType - Event type to be delegated
   * @param {String} [newSelector] - new selector to add to th list of targeted selectors.
   * 
   * @description - The actual function that sets up an event to be tracked.
   * Uses event delegation in order to make sure that future elements of the same selector get tracked as well.
   * 
   */
  delegateEvent(eventType, newSelector) {
    const evt = eventType || 'click';
    const that = this;
    const targetSelectors = Array.of(newSelector) || this.props.selectedSelectors;

    targetSelectors.map(function(selector) {
      var body = document.getElementsByTagName('body')[0];
      var selectorAttribute = 'tracking-' + evt;
      body.addEventListener(evt, (that.delegator)(that, selector, that.countEvent.bind(that)),true);

      selectorAttribute += selectorProcessor(selector);

      body.setAttribute(selectorAttribute, true);
    });
  }

  /**
   * @name removeTracking
   * 
   * @param {String} eventName - name of event associated with tracker to remove
   * @param {String} selector - selector associated with tracker to remove
   * 
   * @description - Intended to allow for quick removal of tracking.
   * removes previously delegated events.
   */

  removeTracking(eventType, selector) {
    const that = this;
    
    if(!eventType){
        throw new ReferenceError('removeEvent was called without an event type set to be removed');
    }
    if(!selector){
        throw new ReferenceError('removeEvent was called without a selector to remove an event from');
    }
    
    const updatedSelectedSelectors = this.props.selectedSelectors.filter(function(val){
        return !(val.selector === selector && val.event === eventType);
    });

    const removeButton = document.querySelector("span[remove-eventful-tracked-" + eventType + "]");

    if(typeof removeButton !== 'null'){
      removeButton.click();
    }
}

  /**
   * @name countEvent
   * 
   * @param {Event} event 
   * 
   * @description - The function that creates event information
   * and sends it back up the component tree using props.updateCounter.
   * 
   * This could be a much more robust logging function.
   * 
   */
  countEvent(event) {
    let element = event.target;
    let description = 'Last tracked event: '+ event.type + ' on ' + element.tagName.toLowerCase();
    if (typeof element.className === 'string') {
      description += '.' + element.className + '.';// This is not needed. Maybe a more robust identifier? element.outerHTML?
    }
    this.props.updateCounter(description, event, element, this.sel);
    return true;
  };

  /**
   * @name onSelectSelector
   * 
   * @param {String} toAdd - selector to be tracked
   * @param {String} evt - name of event to be tracked 
   * 
   * update the list of selected selectors with an object
   * containing the most recently selected selector matched with the event selected.
   * 
   */

  onSelectSelector(toAdd, evt) {
    let currentlySelected = this.props.selectedSelectors;
    
    if(currentlySelected.indexOf(toAdd) === -1){
      /**
       *  This is where we construct the actual tracking data.
       *  The more carefully we construct this object, the more robust the analytics can be.
       *  Currently, it gives us:
       *   - event type,
       *   - associated selector (what was chosen in the dropdown)
       *   - event count at 0
       *   
       *  Could also have an "events" property which could be an array of events tracked data.
       *  Could have event category
       */

      currentlySelected[currentlySelected.length] = { selector: toAdd, event: evt, count: 0 };
    
      this.setState({
    
        selectedSelectors: currentlySelected,
        chosenEvent: ''
      });
  
      (this.delegateEvent.bind(this, evt, toAdd))(this);

    }

  }

  handleChange (selectedOption){
    this.setState({

			chosenEvent: selectedOption.value,
    
    });
  }

  renderEventPicker() {
    let currentlyTracking = this.props.selectedSelectors.length > 0 ? (
      <section>
        <h3>Currently Tracking</h3>
        <ul>
          { this.props.selectedSelectors.map((e, i)=>( <li key={ i }>{ e.selector } tracking { e.event } - { e.count } <a className="remove-tracking" onClick={ () => this.removeTracking(e.event, e.selector) }>x</a></li> )) }
        </ul>
      </section>
    ) : '';
    if (this.state.chosenEvent === ''){
      // Add ability to focus on specific event categories depending upon element chosen.
      const eventOptions = this.state.eventOptions[0].events.map((e,i) =>( { value: e, label: e } ));
      return (
        <div className='choose-event add-tracking-wrapper'>
          { currentlyTracking }
        
          <label htmlFor="chooseEvent">
            <h4>Pick an event to track.</h4>
          
            <Select
              name = 'chooseEvent'
              value = { this.state.selectValue }
              onChange = { this.handleChange.bind(this) }
              options = { eventOptions }
              id = "chooseEvent"
              clearable = { false }
              aria-describedby = { 'Choose an event to track' }
              aria-label = "Choose event"
              autoFocus = { true }

            />
          </label>
        </div>
      );

    } else {
      return (
        <div className='choose-class add-tracking-wrapper'>
          { currentlyTracking }
          
          <SelectorPicker
            selectedSelectors={ this.state.selectedSelectors }
            pageSelectors={ this.props.pageSelectors }
            eventName={ this.state.chosenEvent }
            selectSelector={ (sel, evt) => this.onSelectSelector(sel, this.state.chosenEvent) }
          />
        </div>
      );

    }
  }

  render() {
    return (
      <div className='add-wrapper section'>
        
        <h2>Add Tracking</h2>

        { this.renderEventPicker() }

      </div>
    );
  };
}
