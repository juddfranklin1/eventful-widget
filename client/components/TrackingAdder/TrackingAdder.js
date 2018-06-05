import React,{Component} from 'react';
import ReactDOM from 'react-dom';


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
  
  /* Let's abstract this function
   * to delegate different event types.
   * Once there's an API, this should POST event details to the DB.
   * */  
  delegateEvent(eventType,newClass) {
    const evt = eventType || 'click';
    const that = this;
    const targetSelectors = Array.of(newClass) || this.props.selectedSelectors;

    targetSelectors.map(function(selector)
    {
      document.getElementsByTagName('body')[0].addEventListener(evt, function(e) {
        
        let failsFilter = true,
          el = e.target;
        
        if (selector.indexOf('#') !== -1) {
          var check = el.id.indexOf(selector.substring(1));
        } else if (selector.indexOf('.') !== -1) {
          var check = el.className.indexOf(selector.substring(1));
        } else {
          var check = el.nodeName.toLowerCase().indexOf(selector);
        }

        while (el !== this && (failsFilter = check === -1) && (el = el.parentNode));
        if (!failsFilter) {
          if(!el.hasAttribute('eventful-tracked-' + evt)){//protect against duplicate event listener
            that.sel = selector;
            el.addEventListener(evt, that.countEm.bind(that), { capture: false, once: false, passive: true });
            el.setAttribute('eventful-tracked-' + evt,'true');
          }
        }
      },true);
    });
  }

  countEm(event) {// this should log more robustly.
    let element = event.target;
    let description = 'Last tracked event: '+ event.type + ' on ' + element.tagName.toLowerCase();
    if (typeof(element.innerHTML) === 'string') {
      description += '.' + element.className + '.';
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
    
    if(currentlySelected.indexOf(toAdd) === -1){// 
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
    
        selectedSelectors: currentlySelected
    
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
    if (this.state.chosenEvent === ''){
      // Add ability to focus on specific event categories depending upon element chosen.
      const eventOptions = this.state.eventOptions[0].events.map((e,i) =>( { value: e, label: e } ));

      return (
        <div className='choose-event add-tracking-wrapper'>
          <h3>Pick an event to track.</h3>
          
          <Select
            name='chooseEvent'
            value={ this.state.selectValue }
            onChange={ this.handleChange.bind(this) }
            options={ eventOptions }
            id="chooseEvent"
          />
        </div>
      );

    } else {
      
      return (
        <div className='choose-class add-tracking-wrapper'>
          <h3>Pick some classes to track events on.</h3>

          <SelectorPicker
            selectedSelectors={ this.props.selectedSelectors }
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
