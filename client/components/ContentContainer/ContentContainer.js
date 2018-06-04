/**
 * Wraps the core content of the widget.
 * Inside here all tracking will actually be enabled.
 * 
 * This component does too much.
 * 
 * It should simply contain and bridge the 3 primary internal components
 * 
 * Navbar - Gives the ability to toggle between the overview, tracking, and options tabs
 * - Cookie for maintaining last state
 * Tracker - Where the magic happens...
 * - This sub-component should contain a running record of the elements and events to be tracked
 * - Should offer global and detail views that drill down into event and element data.
 * 
 * Options (Gear or wrench icon)
 * - toggle test mode
 * - which would turn on or off the ability to generate elements to track events.
 * 
 * Add tracker interface (accessed by a plus sign icon)
 * a. allowing a user to track a particular selector for a specific event
 * b. The user should be able to pick from selectors farmed from the current page, or to add their own via text input
 *      (a validator function can confirm that the selector returns results on a page or warn if no elements are found.).
 * c. To make this possible, this would need to be a form with a dropdown, and a text input submitted via a button click event.
 * 
 * Each event should have its own tracking interface.
 * This would be generated from an abstract component.
 */


import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// COMMENT BELOW to disable firebase
import * as firebase from 'firebase';
import 'firebase/database';
import 'firebase/storage';
import config from '../config';
// COMMENT ABOVE to disable firebase

import Options from '../Options/Options.js';
import Tracker from '../Tracker/Tracker.js';
import TrackingAdder from '../TrackingAdder/TrackingAdder.js';
import Navbar from '../Navbar/Navbar.js';

export default class ContentContainer extends Component {

    constructor(props) {
        super();

        this.state = {
            counter: 0,
            element: '',
            pageSelectors: [],
            activeTab: 'tracker',
            latestUpdate: 'No events tracked yet',
            selectedSelectors: [],
            clonedChildren: [],
            logEvent: true,
            markEvent: true
        }
    }

    // Configuration file is not in the repository, so create a file in the client folder called config.js with content like this:
    /**
     *  export default {
     *    apiKey: API_KEY_HERE,
     *    authDomain: AUTH_DOMAIN_HERE,
     *    databaseURL: DATABASE_URI_HERE,
     *    projectId: PROJECT_ID_HERE,
     *    storageBucket: "",
     *    messagingSenderId: SENDER_ID_HERE
     *  };
     *  
     *  The better next step is to have a "save to database" option on the front end and then use that to let user choose datastore type, add credentials, and store them locally.
     *  https://github.com/juddfranklin1/eventful-widget/issues/6
    */

    configure(configType) {// Prepared for abstraction of storage, but currently only handles firebase
        let database = false;

        if (configType === 'FIREBASE' && firebase){
            firebase.initializeApp(config);

            database = firebase.database();

        }

        return database;
    }

    unique(list, x) {
        if (x != "" && list.indexOf(x) === -1) {
            list.push(x);
        }
        return list;
    };

    trim(x) { return x.trim(); };

    componentWillMount() {
        const that = this;

        /**
         * Gathering all ids, classes, and tags used on the page.
         * 
         * todo: reduce the number of invisible tags (noscript, meta, etc.) that sneak past the filter.
         */

        const ids = [].reduce.call(document.querySelectorAll('[id]'), function(acc, e) {
            return {type:'id', value: e.id};
        }, []);
        
        let classNames = [].reduce.call(document.querySelectorAll('[class]'), function(acc, e) {
            return e.getAttribute('class').split(' ').map(that.trim).reduce(that.unique, acc);
        }, []);
        classNames = classNames.map(function(ele){
            return { type: 'class', value: ele };
        });

        
        const treeWalker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_ELEMENT,
            { acceptNode: function(node) { if(node.tagName !== 'SCRIPT' && node.id !== 'eventful-root') return NodeFilter.FILTER_ACCEPT; } },
            false
        );
        
        const allElements = [];
          
        while(treeWalker.nextNode()) allElements.push(treeWalker.currentNode);

        const tagNames = [].reduce.call(allElements,function(acc,el){
                acc.push(el.tagName);
                return acc;
            },
            []);

        let uniqueElements = tagNames.reduce(that.unique,[]);

        uniqueElements = uniqueElements.map(function(ele){
            return { type: 'element', value: ele.toLowerCase() };
        });

        const selectors = [].concat(ids, classNames, uniqueElements);

        this.setState({
            pageSelectors: selectors
        });

        if(!!!config) var config = false;
        if(!!!firebase) var firebase = false;

        const database = this.configure('FIREBASE',config);

        /**
         * @name createEventMarker
         * @function
         * @param {Event} context
         * @param {HTMLElement} eventMarker
         * @author juddfranklin1
         * 
         * @description create a tooltip to house the event data
         * 
         * @
         * This function should take an x and y coord, as well as the event data.
         * 
         */
        const createEventMarker = function(context, eventMarker) {
            const leftVal = context.eventData.clientX + window.pageXOffset;
            const topVal = context.eventData.clientY + window.pageYOffset;
            eventMarker.setAttribute('style', 'left: ' + leftVal + 'px; top: ' + topVal + 'px')
            eventMarker.classList.add('event-marker');
            eventMarker.setAttribute('data-eventid', context.eventId);
            let body = document.querySelector('body');
            body.appendChild(eventMarker);
        }

        /**
         * @name toggleTooltip
         * @function
         * @param {Event} e - the event associated with the data.
         * @author juddfranklin1
         * 
         * @description create a tooltip to house the event data and display it; or remove it.
         * 
         * This function should take an x and y coord, as well as the event data.
         * 
         */
        const toggleTooltip = function(e) {
            e.stopPropagation();
            const oldToolTip = document.querySelector('.tooltip');
            const context = e.target.context;

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

                const eventDataPoints = Object.keys(context.eventData);
                
                const tooltipText = eventDataPoints.reduce(function(iter, curr, i){
                    return curr === 'Event' ? iter + '<p><b>' + context.eventData[curr] + '</b></p>' : iter + '<p>' + curr + ': ' + context.eventData[curr] + '</p>';
                },'');

                tooltip.innerHTML = tooltipText;

                this.appendChild(tooltip);//Tooltip inserted into element being hovered
                
                const closeBtn = document.createElement('span');
                closeBtn.classList.add('close-btn');
                tooltip.appendChild(closeBtn);

                tooltip.parentElement.removeEventListener('click', toggleTooltip);
                tooltip.classList.add('show');

            }
        }
        /**
         * @name hideEventData
         * @function
         * @param {Event} e - the event associated with the data.
         * @author juddfranklin1
         * 
         * @description - triggers the fadeOut behavior
         * 
         */

        /**
         * @function getEvents
         * @author juddfranklin1
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
        const getEvents = function() { 
            if(database){ // Currently does nothing if not connected to database. Should also check for local storage option and load from there.
                database.ref('events').on('value', function(results) {

                    //handle results here.

                    /**
                     * create an object that has each event in it
                     * return that object
                     * The object should have a method that can generate a tooltip on demand for any given event within that object
                     */

                    let allEvents = results.val();
                    let eventData = [];
                    for (var item in allEvents) { //loop through the events and restructure the data
                        let context = {
                            event: allEvents[item].event,
                            eventData: allEvents[item].eventData,
                            eventId: item
                        };

                        let eventMarker = document.createElement('span');

                        eventMarker.context = context;

                        //generate an event marker
                        createEventMarker(context, eventMarker);

                        eventMarker.addEventListener('click', toggleTooltip,{capture:true});
                    }
                });
            }
        }

        getEvents();

        return;

    }

    updateCounter(text, evt, el) {
        // use lodash to convert event data to an array for logging.

        let eventMarker = document.createElement('span');
        eventMarker.style.top = evt.clientY;

        eventMarker.style.left = evt.clientX;
        eventMarker.classList.add('event-marker');
        el.appendChild(eventMarker);

        //Set tooltip for eventMarker
        //Get database content

        let eventData = {
            'Event': evt.type,
            'target': evt.target,
            'bubbles': evt.bubbles,
            'clientX': evt.clientX,
            'clientY': evt.clientY,
            'screenX': evt.screenX,
            'screenY': evt.screenY,
            'altKey': evt.altKey
        };

        if(typeof firebase !== 'undefined'){ // store - currently only firebase.
            const dataStore = firebase.database();
            let eventsReference = dataStore.ref('events');
    
            eventsReference.push({
                event: evt.type,
                eventData: eventData
            });
        }

        if (this.state.logEvent) {
            console.info(evt);
            console.info(el);
        }

        if (evt.altKey) {// Does different stuff if alt key is pressed.
            eventMarker.style.backgroundColor = 'blue';
        }

        this.setState({
            counter: this.state.counter + 1,// counter is extremely generic. Counts events of all tracked types on all tracked elements.
            latestUpdate: text
        });

        return;

    }

    clearEvents(firebase) {
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

    changeTab(tab) {
        this.setState({
            activeTab: tab
        });
        return;
    }

    setLogEvent(doLog) {
        this.setState({
            logEvent: doLog,
        });
        return;

    }

    render() {

        let activeTabContent = null;

        if (this.state.activeTab === "add") {

            activeTabContent = <TrackingAdder
            pageSelectors = { this.state.pageSelectors }
            pageIds = { this.state.pageIds }
            pageTagNames = { this.state.pageTagNames }
            selectedSelectors = { this.state.selectedSelectors }
            updateCounter = { this.updateCounter.bind(this) }
            logEvent = { this.state.logEvent }
            />;

        } else if (this.state.activeTab === "options") {

            activeTabContent = <Options
            pageSelectors = { this.state.pageSelectors }
            selectedSelectors = { this.state.selectedSelectors }
            setLogEvent = { this.setLogEvent.bind(this) }
            clearEvents = { this.clearEvents.bind(this, firebase) }
            logEvent = { this.state.logEvent }
            />;

        } else {

            activeTabContent = <Tracker
            counter = { this.state.counter }
            latestUpdate = { this.state.latestUpdate }
            selectedSelectors = { this.state.selectedSelectors }
            logEvent = { this.state.logEvent }
            />;

        }

        return (
            <div className = "eventful-content-wrapper" >

                <Navbar changeTab = { this.changeTab.bind(this) } activeTab = { this.state.activeTab } />

                { activeTabContent }

            </div>
        );
    }
}
