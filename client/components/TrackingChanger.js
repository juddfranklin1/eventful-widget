import React,{Component} from 'react';

import { selectorProcessor, hasParent, selectorObjectToString } from '../lib/display-helpers.js';
import CurrentlyTracking from './CurrentlyTracking';

import Select from 'react-select';

import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';

/* The component where we will be able to track new elements or new events */

export default class TrackingChanger extends Component {
  constructor(props) {
    super();
    this.state = {
      chosenSelector: '',
      selectValue: '',
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
            'error',
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
        },
        {
          eventGroup: 'window',
          events: [
            'afterprint',
            'beforeprint',
            'beforeunload',
            'hashchange',
            'languagechange', 
            'message',
            'messageerror',
            'offline',
            'online',
            'pagehide',
            'pageshow',
            'popstate',
            'storage',
            'unhandledrejection', 
            'unload',
            'appinstalled',
            'beforeinstallprompt',
            'devicelight',
            'devicemotion',
            'deviceorientation',
            'deviceorientationabsolute',  // Chrome only
            'deviceproximity',
            'gamepadconnected',
            'gamepaddisconnected',
            'mozbeforepaint',
            'paint',
            'rejectionhandled',
            'userproximity',
            'vrdisplayconnect',
            'vrdisplaydisconnect',
            'vrdisplayactivate',
            'vrdisplaydeactivate',
            'vrdisplayblur',
            'vrdisplayfocus',
            'vrdisplaypresentchange',
          ]
        }
        // etc...
      ],
    }
  }

  body = document.getElementsByTagName('body')[0];

  componentDidMount(){
    if (this.props.selectedSelectors.length > 0) return;

    const that = this;
    that.state.eventOptions.map(function(el){
      const scope = that;
      el.events.map(function(event){
        scope.body.addEventListener(event, function(e){// This is a clunky function but makes sure that everything is up to date.
          if(hasParent(e.target, document.getElementById('eventful-root'))) return;// don't bother with elements in the tracker itself
          const body = document.getElementsByTagName('body')[0];
      
          let eventfulAtts = [];
      
          for (var i = 0, atts = body.attributes, n = atts.length; i < n; i++) {
            if(atts[i].name.indexOf('data-eventful-tracking') !== -1) eventfulAtts.push(atts[i].name);
          }
        
          if(eventfulAtts.length === 0) return;
      
          // construct selectors from the attribute string

          eventfulAtts = eventfulAtts.map(function(attr) {
            const attrArr = attr.split('-');
            const selectorInfo = {};
            selectorInfo.event = attrArr[3];
            if (attr.indexOf('class') !== -1){
              let selector = attrArr.slice(attrArr.indexOf('class') + 1);
              selectorInfo.value = selector.join('-');
              selectorInfo.type = 'class';
            } else if (attrArr.indexOf('id') !== -1){
              let selector = attrArr.slice(attrArr.indexOf('id') + 1);
              selectorInfo.value = selector.join('-');
              selectorInfo.type = 'id';
            } else {
              selectorInfo.value = attrArr[attrArr.length - 1];
              selectorInfo.type = 'element';
            }

            // manage events that don't propagate by placing eventful attributes directly on the elements, rather than on the body tag.
            if (selectorInfo.value === 'input' || selectorInfo.value === 'video' || selectorInfo.value === 'audio' || selectorInfo.event === 'mouseenter' || selectorInfo.event === 'mouseleave') {
              const query = selectorInfo.type === 'element' ? selectorInfo.value : selectorInfo.type === 'id' ? '#' + selectorInfo.value : '.' + selectorInfo.value;
              const targets = document.querySelectorAll(query);
              [].forEach.call(targets,
                (el) => {
                  if (el.hasAttribute(attr)) return;// No need to reapply
                  el.setAttribute(attr, true);
                  el.addEventListener(selectorInfo.event, function(e) {
                    that.countEvent(e, query);
                  });
                }
              );
            }

            return selectorInfo;
          });
      
          // run event tracking when e.target.classList.has(selector)/e.target.tagName.toLowerCase() === selector / e.target.id === selector
          eventfulAtts.map (
            el => {
              if (el.event === e.type) {
                let constructedSelector = false;
                if (el.type === 'id' && e.target.id === el.value) {
                  constructedSelector = '#' + el.value;
                }
                else if (el.type === 'class' && e.target.classList.contains(el.value)) {
                  constructedSelector = '.' + el.value;
                }
                else if (e.target.tagName.toLowerCase() === el.value) {
                  constructedSelector = '<' + el.value + '>'
                }
                if (constructedSelector) that.countEvent(e, constructedSelector);
              }
            }
          );
        });
      });
    });
  }

  /**
   * @name removeTracking
   * 
   * @param {Element} removalLink - The actual link clicked
   * @param {String} eventName - name of event associated with tracker to remove
   * @param {String} selector - selector associated with tracker to remove
   * 
   * @description - Intended to allow for quick removal of tracking.
   * removes previously delegated events.
   */
  removeTracking(eventType, selector) {
    if(!!!eventType){
        throw new ReferenceError('removeEvent was called without an event type set to be removed');
    }
    if(!!!selector){
        throw new ReferenceError('removeEvent was called without a selector to remove an event from');
    }
    
    // Dump the tracker if it matches both selector and event
    const newSelectedSelectors = this.props.selectedSelectors.filter( el => el.selector !== selector || el.event !== eventType );

    var selectorAttribute = 'data-eventful-tracking-' + eventType;
    selectorAttribute += selectorProcessor(selector);

    const elsToClear = document.querySelectorAll('[' + selectorAttribute + ']');
    [].forEach.call(elsToClear,(el) => {
      el.removeAttribute(selectorAttribute);
    });

    this.props.changeSelectedSelectors(newSelectedSelectors);
    
    return newSelectedSelectors;
  }

  /**
   * @name countEvent
   * 
   * @param {Event} event 
   * @param {String} selector 
   * 
   * @description - The function that creates event information
   * and sends it back up the component tree using props.updateCounter.
   * 
   * This could be a much more robust logging function.
   * 
   */
  countEvent(event, selector) {
    const that = this;
    console.log(event);
    selector = selector.replace(/[<>]/g,'');//clear out tag opening and closing symbols.
    
    if(!!document.querySelector('[data-eventful-tracking-' + event.type + selectorProcessor(selector) + ']')){// don't track if there's no attribute requiring it.
      let description = 'Last tracked event: '+ event.type + ' on ' + selector + '.';
      that.props.updateCounter(description, event, event.target, selector);
    }
    return true;
  };

  /**
   * @name onSelectEvent
   * 
   * @param {String} newSelector - selector to be tracked
   * @param {String} newEvent - name of event to be tracked 
   * 
   * update the list of selected selectors with an object
   * containing the most recently selected selector matched with the event selected.
   * 
   */
  onSelectEvent(newSelector, newEvent) {
    let currentlySelected = this.props.selectedSelectors;
    const event = newEvent || '';

    if(currentlySelected.indexOf(newSelector) === -1){

      const now = new Date().toTimeString();

      currentlySelected[currentlySelected.length] = {
        selector: newSelector,
        event: event,
        count: 0,
        started: now
      };
    
      this.setState({
        selectedSelectors: currentlySelected,
        chosenSelector: ''
      });
  
      var attrString = 'data-eventful-tracking-' + newEvent + selectorProcessor(newSelector);
      this.body.setAttribute(attrString, true);
    }

  }

  handleSelectorChange (selectedOption){
    this.setState({

			chosenSelector: selectedOption.value,
    
    });
  }
  handleEventChange (selectedOption){
    this.onSelectEvent(this.state.chosenSelector, selectedOption.value);
  }

  renderEventPicker() {//Currently Tracking section should be abstracted into a component for use everywhere.
    
    if (this.state.chosenSelector === ''){
      const selectorOptions = this.props.pageSelectors.map(function(e,i){
        var value = selectorObjectToString(e);
        return {
          value: value, label: value
        }
      });

      const label = this.props.eventName + '-label';  

      return (
        <div className='choose-selector add-tracking-wrapper'>

          <label htmlFor='chooseSelector'><h4>Pick from the following selectors to track events on.</h4>
          
            <Select
              name = 'chooseSelector'
              value = { this.state.selectValue }
              options = { selectorOptions }
              id = { label }
              clearable = { false }
              aria-describedby = 'Choose a selector from the page to track events on.'
              aria-label = 'Choose selector'
              autoFocus = { true }
              onChange = { this.handleSelectorChange.bind(this) }
            />
          </label>
        </div>
      );
    }
    else {
      // Issue #13 - https://github.com/juddfranklin1/eventful-widget/issues/13

      /**
       *  Need clean logic here for checking if this.state.chosenSelector is a specific type of element.
       *  If so, add element-specific events to eventOptions;
       *  If 'audio' or 'video', include media events
       *  If 'input' include input events
       * 
       *  Easiest is probably a reduce call that loops through this.state.eventOptions,
       *  constructing a collection of events on the fly.
       * */
      let eventOptions = this.state.eventOptions[0].events.map((e,i) => ( { value: e, label: e } ));
      
      if (this.state.chosenSelector === 'video' || this.state.chosenSelector === 'audio') {
        eventOptions = this.state.eventOptions.filter(el => el.eventGroup === 'media')[0].events.map((e,i) =>  ( { value: e, label: e } ));;
      } else if (this.state.chosenSelector === 'input'){
        eventOptions = this.state.eventOptions.filter(el => el.eventGroup === 'input')[0].events.map((e,i) =>  ( { value: e, label: e } ));;
      }
      
      return (
        <div className='choose-event add-tracking-wrapper'>
          <label htmlFor="chooseEvent">
            <h4>Pick an event to track.</h4>

            <Select
              name = "chooseEvent"
              value = { this.state.selectValue }
              onChange = { this.handleEventChange.bind(this) }
              options = { eventOptions }
              id = "chooseEvent"
              clearable = { false }
              aria-describedby = { "Choose an event to track" }
              aria-label = "Choose event"
              autoFocus = { true }
            />
          </label>
        </div>
      );
    }
  }

  render() {
    const currentlyTracking = this.props.selectedSelectors.length > 0 ? (
      <CurrentlyTracking
        selectedSelectors={ this.props.selectedSelectors }
        removeTracking={ this.removeTracking.bind(this) }
        event={ event }
      />
    ) : '';

    return (
      <div className='add-wrapper section'>
        { currentlyTracking }
        <h2>Add Tracking</h2>

        { this.renderEventPicker() }

      </div>
    );
  };
}
