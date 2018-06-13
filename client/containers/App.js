import { connect } from 'react-redux';
import { setActiveTab } from '../actions';
import App from '../components/App';
import { TabFilters } from '../actions';
import config from '../config';

const getActiveTab = (filter) => {
  switch (filter) {
    case TabFilters.TAB_OVERVIEW:
      return 'overview';
    case TabFilters.TAB_MANAGE:
      return 'manage';
    case TabFilters.TAB_OPTIONS:
      return 'options';
    default:
      throw new Error('Unknown tab filter: ' + filter)
  }
};

const mapStateToProps = state => ({
  selectors: getActiveTab(state.activeTab)
});

const mapDispatchToProps = dispatch => ({
    setActiveTab: id => dispatch(setActiveTab(id))
});

const willMountFunc = function () {
  const that = this;

  /**
   * Gathering all ids, classes, and tags used on the page.
   * 
   * todo: reduce the number of invisible tags (noscript, meta, etc.) that sneak past the filter.
   */

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
      { acceptNode: function(node) { if(node.tagName !== 'SCRIPT' && node.id !== 'eventful-root') return NodeFilter.FILTER_ACCEPT; } },
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

  if(!!!config) var config = false;
  if(!!!firebase) var firebase = false;

  const database = this.configure('FIREBASE',config);

  /**
   * @name toggleTooltip
   * @function
   * @param {Event} e - the event associated with the data.
   * 
   * @description create a tooltip to house the event data and display it; or remove it.
   * 
   * This function should take an x and y coord, as well as the event data.
   * 
   */
  const toggleTooltip = function(e) {
      e.stopPropagation();
      const oldToolTip = document.querySelector('.tooltip');
      const context = e.target.eventDataObject;

      if (oldToolTip !== null && oldToolTip) {// no lingering tooltips, please.
          oldToolTip.classList.add('hide');
          oldToolTip.addEventListener("transitionend", function(e) {
              oldToolTip.parentElement.removeChild(oldToolTip);
          }, false);
      }

      if (e.target.classList.contains('close-btn')){
          
          return false;
      } else {
          const tooltip = document.createElement('span');
          tooltip.classList.add('tooltip');

          const eventDataKeys = Object.keys(context.eventData);
          
          const tooltipText = eventDataKeys.reduce(function(iter, curr, i) {
              var escapedData = that.HTMLEscape(context.eventData[curr]);
              return curr === 'Event' ? iter + '<p><b>' + escapedData + '</b></p>' : iter + '<p>' + curr + ': ' + escapedData + '</p>';
          },'');

          tooltip.innerHTML = tooltipText;

          this.appendChild(tooltip);// Tooltip inserted into element being hovered
          
          const closeBtn = document.createElement('span');
          closeBtn.classList.add('close-btn');
          tooltip.appendChild(closeBtn);

          tooltip.parentElement.removeEventListener('click', toggleTooltip);
          tooltip.classList.add('show');

      }
  }

  /**
   * @function getEvents
   * 
   * @description  - wrapper function to get and process events from firebase
   * 
   * call the firebase datastore for events
   * 
   * Will need an optional param for specifying a narrower search.
   * 
   * Could be abstracted to allow for an API for choosing your own callback behavior.
   * 
   */
  const getEvents = function(that) {
      
      if(database){ // Currently does nothing if not connected to database. Should also check for local storage option and load from there.
          database.ref('events').on('value', function(results) {

              //handle results here.

              /**
               * create an object that has each event in it
               * return that object
               * The object should have a method that can generate a tooltip on demand for any given event within that object
               */

              const allEvents = results.val();
              const eventData = [];
              if(!that.flag){
                  for (var item in allEvents) { //loop through the events and restructure the data
                      let context = {
                          event: allEvents[item].event,
                          eventData: allEvents[item].eventData,
                          eventId: item
                      };

                      //generate an event marker
                      const eventMarker = that.createEventMarker(context, context.eventId);

                      if (that.state.logEvent) {
                          console.info('************* STORED EVENT DATA OBJECT ****************');
                          console.info(context.eventData);
                      }
                      eventMarker.eventDataObject = context;
                      eventMarker.addEventListener('click', toggleTooltip,{capture:true});
                  }
                  that.flag = !that.flag;
              }

          });
      }
  }

  getEvents(that);

  return;

}

/**
* @name createEventMarker
* @function
* @param {Object} context - info about the event
* @param {String} [eventId] - unique identifier provided by Firebase
* 
* @description create a tooltip to house the event data
* 
* This function should take an x and y coord, as well as the event data.
* 
*/
const createEventMarker = function(context, eventId) {
  let eventMarker = document.createElement('span');
  eventMarker.classList.add('event-marker');
  
  const leftVal = context.eventData.clientX;
  const topVal = context.eventData.clientY;
  eventMarker.setAttribute('style', 'left: ' + leftVal + 'px; top: ' + topVal + 'px');
  if(typeof eventId !== 'undefined')
      eventMarker.setAttribute('data-eventid', eventId);

  if (context.event.altKey) {// Does different stuff if alt key is pressed.
      eventMarker.style.backgroundColor = 'blue';
  }

  document.body.appendChild(eventMarker);

  return eventMarker;
}

/**
* @name updateCounter
* 
* @param {String} text - message linked to event
* @param {String} evt - event type associated with tracked event
* @param {String} el - element targeted by event
* @param {String} sel - selector associated with tracked event
* 
* @description - Updates state to increment the counter and change the overview tab content
* 
* Currently also creates event marker. That should be a separate function.
*/
const updateCounter = function(text, evt, el, sel) {
  // use lodash to flatten event data to an array for logging.

  // Mark the location of the event
  const eventData = {
      'selector': sel,
      'event': evt.type,
      'targetHTML': evt.target.outerHTML,
      'bubbles': evt.bubbles,
      'clientX': evt.clientX,
      'clientY': evt.clientY,
      'screenX': evt.screenX,
      'screenY': evt.screenY,
      'altKey': evt.altKey
  };

  let context = {
      event: evt,
      eventData: eventData,
      eventId: 'new-event'
  };

  const eventMarker = this.createEventMarker(context);
  
  //

  if(typeof firebase !== 'undefined'){ // store - currently only firebase.
      const dataStore = firebase.database();
      const eventsReference = dataStore.ref('events');

      eventsReference.push({
          event: evt.type,
          eventData: eventData
      });
  }

  if (this.state.logEvent) {
      console.info('************ BEGIN EVENT DATA ***************');
      console.info(evt);
      console.info('************ SAVED EVENT DATA OBJECT ***************');
      console.info(eventData);
      console.info('************ TARGETED ELEMENT ***************');
      console.info(el);
      console.info('************ END EVENT DATA ***************');
  }

  const newSelectors = this.state.selectedSelectors.map(function(val){// Redux should do this.
      if(val.selector === sel && val.event === event.type)
          val.count += 1;

      return val;
  });
  this.setState({
      selectedSelectors: newSelectors,
      latestUpdate: text
  });

  return;

};

const clearEvents = function(firebase) {
  if(!firebase) return false;

  let database = firebase.database();

  let eventsRef = database.ref('events');

  eventsRef.remove(function(){
      let markers = document.querySelectorAll('.event-marker');
      for(var i = 0; i < markers.length; i++) {
          markers[i].parentNode.removeChild(markers[i]);
      }
  });
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);