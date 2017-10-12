import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as firebase from 'firebase';
import 'firebase/database';
import 'firebase/storage';

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
    constructor(props) {
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

    componentWillMount() {

        let classyElements = document.querySelectorAll('[class]');

        let unique = function(list, x) {
            if (x != "" && list.indexOf(x) === -1) {
                list.push(x);
            }
            return list;
        };
        let trim = function(x) { return x.trim(); };
        let classNames = [].reduce.call(classyElements, function(acc, e) {
            return e.className.split(' ').map(trim).reduce(unique, acc);
        }, []);


        this.setState({
            pageClasses: classNames,
        });

        const config = {
            apiKey: "AIzaSyAPare5GoVNFSxqlCGcIpcPHWo9d2qPgLA",
            authDomain: "eventful-60cde.firebaseapp.com",
            databaseURL: "https://eventful-60cde.firebaseio.com",
            projectId: "eventful-60cde",
            storageBucket: "",
            messagingSenderId: "20568324415"
        };

        firebase.initializeApp(config);

        let database = firebase.database();
        /**
         * Generic getEvents wrapper function
         * call the firebase datastore for events
         * Will need an optional param for specifying a narrower search.
         * 
         */

        function createEventMarker(context, eventMarker) {
            eventMarker.style.top = context.eventData.clientY;
            eventMarker.setAttribute('style', 'left: ' + context.eventData.clientX + 'px; top: ' + context.eventData.clientY + 'px')
            eventMarker.style.left = context.eventData.clientX;
            eventMarker.classList.add('event-marker');
            eventMarker.setAttribute('data-eventid', context.eventId);
            let body = document.querySelector('body');
            body.appendChild(eventMarker);
        }

/**
         * create a tooltip to house the event data
         * This function should take an x and y coord, as well as the event data.
         */
        function showEventData(e) {
            if(typeof fadeOut !== 'undefined')
                clearInterval(fadeOut);
            let oldToolTip = document.querySelector('.tooltip');
            
            let context = e.target.context;
            
            if (oldToolTip !== null && oldToolTip) {
                oldToolTip.parentNode.removeChild(oldToolTip);
            }
            let tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            let eventDataPoints = Object.keys(context.eventData);
            let tooltipText = eventDataPoints.reduce(function(iter, curr, i){
                return curr === 'Event' ? iter + '<p><b>' + context.eventData[curr] + '</b></p>' : iter + '<p>' + curr + ': ' + context.eventData[curr] + '</p>';
            },'');
            tooltip.innerHTML = tooltipText;
            let tooltipLocation = [context.eventData.clientX + 5, context.eventData.clientY + 5];
            tooltip.style.left = '6px';
            tooltip.style.top = '6px';
            tooltip.style.opacity = 0;
            this.appendChild(tooltip);//Tooltip inserted into element being hovered
            let fadeIn = window.setInterval(function() {
                let tooltipOpacity = window.getComputedStyle(tooltip).opacity;
                if (tooltipOpacity == 1) {  
                    tooltip.addEventListener('mouseleave', hideEventData);
                    clearInterval(fadeIn);
                }

                tooltip.style.opacity = Number.parseFloat(tooltipOpacity) + .05;
            }, 50);

        }

        function hideEventData(e) {
            if(typeof fadeIn !== 'undefined')
                clearInterval(fadeIn);                        
            let oldToolTip = document.querySelector('.tooltip');
            if (!oldToolTip) {
                return false;
            }
            let fadeOut = window.setInterval(function() {
                let tooltipOpacity = window.getComputedStyle(oldToolTip).opacity;
                if (tooltipOpacity <= 0.1) {
                    if(oldToolTip.parentNode !== null)
                        oldToolTip.parentNode.removeChild(oldToolTip);
                    clearInterval(fadeOut);
                }

                oldToolTip.style.opacity = Number.parseFloat(tooltipOpacity) - .1;
            }, 50);
        }

        function getEvents() {
            database.ref('events').on('value', function(results) {

                //handle results here.

                /**
                 * create an object that has each event in it
                 * return that object
                 * The object should have a method that can generate a tooltip on demand for any given event within that object
                 */

                let allEvents = results.val();
                let eventData = [];
                for (var item in allEvents) { //loop through the events restructure the data
                    if(typeof item.eventData !== 'object')
                        console.log(firebase);
                    let context = {
                        event: allEvents[item].event,
                        eventData: allEvents[item].eventData,
                        eventId: item
                    };

                    let eventMarker = document.createElement('span');

                    eventMarker.context = context;

                    //generate an event marker
                    createEventMarker(context, eventMarker);

                    eventMarker.addEventListener('mouseenter', showEventData);
                    eventMarker.addEventListener('mouseleave', hideEventData);
                }
            });
        }

        getEvents();

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

    updateCounter(text, evt, el) {
        let coords = { left: evt.screenX + 'px', top: evt.screenY + 'px' };
        let eventMarker = document.createElement('span');
        eventMarker.style.top = evt.clientY;
        eventMarker.setAttribute('style', 'left: ' + evt.clientX + 'px; top: ' + evt.clientY + 'px')
        eventMarker.style.left = evt.clientX;
        eventMarker.classList.add('event-marker');
        el.appendChild(eventMarker);

        let database = firebase.database();
        //Set tooltip for eventMarker
        //Get database content

        let eventData = {
            'Event': evt.type,
            'target': evt.target,
            'bubbles': evt.bubbles,
            'clientX': evt.clientX,
            'clientY': evt.clientY,
            'screenX': evt.screenX,
            'screenY': evt.screenY
        };

        let eventsReference = database.ref('events');

        // use the set method to save data to the events
        eventsReference.push({
            event: evt.type,
            eventData: eventData
        });

        if (this.state.logEvent) {
            console.info(evt);
            console.info(el);
        }

        if (evt.altKey) {
            evt.target.style.height = 40;
            evt.target.style.backgroundColor = 'blue';
        }

        this.setState({
            counter: this.state.counter + 1,
            latestUpdate: text
        });

        return;

    }

    clearEvents() {
        

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

            activeTabContent = < AddTrackingWrapper
            pageClasses = { this.state.pageClasses }
            selectedClasses = { this.state.selectedClasses }
            updateCounter = { this.updateCounter.bind(this) }
            logEvent = { this.state.logEvent }
            />;

        } else if (this.state.activeTab === "options") {

            activeTabContent = < OptionsWrapper
            pageClasses = { this.state.pageClasses }
            selectedClasses = { this.state.selectedClasses }
            setLogEvent = { this.setLogEvent.bind(this) }
            clearEvents = { this.clearEvents.bind(this) }
            logEvent = { this.state.logEvent }
            />;

        } else {

            activeTabContent = < TrackerWrapper
            counter = { this.state.counter }
            latestUpdate = { this.state.latestUpdate }
            selectedClasses = { this.state.selectedClasses }
            logEvent = { this.state.logEvent }
            />;

        }

        return ( <div className = "eventful-content-wrapper" >

            <Navigation changeTab = { this.changeTab.bind(this) } activeTab = { this.state.activeTab } />

            { activeTabContent }

            </div> );
    }
}
