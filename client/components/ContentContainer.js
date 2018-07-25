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
import { HTMLEscape, wrap, unique, rm } from '../lib/display-helpers.js';

import Options from './Options';
import Tracker from './Tracker';
import TrackingChanger from './TrackingChanger';
import Navbar from './Navbar';
import { configure, getStoreLibrary } from '../lib/database-helpers';

export default class ContentContainer extends Component {
    constructor(props) {
        super();

        this.state = {
            element: '',
            pageSelectors: [],
            activeTab: 'tracker',
            latestUpdate: 'No events tracked yet',
            selectedSelectors: [],
            clonedChildren: [],
            logEvent: false,
            markEvent: true,
            database: 'FIREBASE'
        }

    }

    flag = false;

    /**
    * @function getEvents
    * 
    * @description  - wrapper function to get and process events from datastore.
    * !!!Currently just supports firebase!!!
    * 
    * call the firebase datastore for events
    * 
    * Will need an optional param for specifying a narrower search.
    * 
    * Should be abstracted to allow for an API for choosing your own callback behavior.
    * 
    */

    getEvents(that, database) {
        if(database){ // Currently does nothing if not connected to database. Should also check for local storage option and load from there.
            if(this.state.database === 'FIREBASE'){
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
                            eventMarker.addEventListener('click', that.toggleTooltip,{capture:true});
                        }
                        that.flag = !that.flag;
                    }
                });
            }
        }
    }

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
    
    toggleTooltip = function(e) {
        const that = this;
        e.stopPropagation();
        const oldToolTip = document.querySelector('.eventful-tooltip');
        const context = e.target.eventDataObject;
        
        if (oldToolTip !== null && oldToolTip) {// no lingering tooltips, please.
            oldToolTip.classList.add('hide');
            oldToolTip.parentElement.classList.remove('has-tooltip');
            oldToolTip.addEventListener("transitionend", function(e) {
                oldToolTip.parentElement.removeChild(oldToolTip);
            }, false);
        }

        if (e.target.classList.contains('eventful-close-btn')){ 
            return false;
        } else {
            const tooltip = document.createElement('span');
            tooltip.classList.add('eventful-tooltip');

            const tooltipHeadline = '<h5>' + context.eventData['event'] + ' on ' + context.eventData['selector'] + '</h5>';
            const tooltipSubHeadline = '<h6>' + context.eventData['time'] + '</h6>';

            delete context.eventData['event'];
            delete context.eventData['selector'];
            delete context.eventData['time'];

            const eventDataKeys = Object.keys(context.eventData);

            const tooltipText = eventDataKeys.reduce(function(iter, curr, i) {
                console.log(context.eventData[curr]);
                var escapedData = HTMLEscape(context.eventData[curr]);
                var classCurr = curr.toLowerCase();
                return iter + '<dt class="eventful-tooltip-key-' + classCurr + '">' + curr + '</dt><dd class="eventful-tooltip-value-' + classCurr + '">' + escapedData + '</dd>';
            },'<dl class="eventful-tooltip-content event-details">');

            tooltip.innerHTML = tooltipHeadline + tooltipSubHeadline + tooltipText + '</dl>';// Only append to the DOM once.

            this.appendChild(tooltip);// Tooltip inserted into element being hovered
            this.classList.add('has-tooltip');
            
            const closeBtn = document.createElement('span');
            closeBtn.classList.add('eventful-close-btn');
            tooltip.appendChild(closeBtn);

            tooltip.parentElement.removeEventListener('click', that.toggleTooltip);
            tooltip.classList.add('show');

        }
    }

    /**
     * @name gatherSelectors
     * 
     * @description - Walk the DOM to accumulate ids, classes, and visible DOM elements
     * set state.pageSelectors = to that object
     * 
     * todo: reduce the number of invisible tags (noscript, meta, etc.) that sneak past the filter.
     */
    gatherSelectors() {
        const ids = [].reduce.call(document.querySelectorAll('[id]'), function(acc, e) {
            return {type:'id', value: e.id};
        }, []);

        const trimWrap = wrap(String.prototype.trim);

        let classNames = [].reduce.call(document.querySelectorAll('[class]'), function(acc, e) {
            return e.getAttribute('class').split(' ').map(trimWrap).reduce(unique, acc).filter(function(el){ return el.indexOf('eventful-') === -1 && el.indexOf('Select') === -1; });
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

        const tagNames = [].reduce.call(allElements,
            function(acc,el){
                acc.push(el.tagName);
                return acc;
            },
            []);

        let uniqueElements = tagNames.reduce(unique,[]);

        uniqueElements = uniqueElements.map(function(ele){
            return { type: 'element', value: ele.toLowerCase() };
        });

        const selectors = [].concat(ids, classNames, uniqueElements);

        this.setState({
            pageSelectors: selectors
        });

    }

    componentWillMount() {
        
        const that = this;

        this.gatherSelectors();// Doing this before eventful loads avoids the problem of tracking eventful elements.

        const database = configure(this.state.database);

        this.getEvents(that, database);

        // Set it up to check for element changes to the page.
        const observer = new MutationObserver(this.gatherSelectors.bind(this));
        observer.observe(document.body,{ childList: true, subtree: true });

        return;

    }

    componentDidMount(){
        document.body.addEventListener('keyup', this.keyboardNavigateEvents, true);
    }

    /**
     * @name createEventMarker
     * @function
     * @param {Object} context - info about the event
     * @param {String} [eventId] - unique identifier provided by datastore
     * 
     * @description create a tooltip to house the event data
     * 
     * This function should take an x and y coord, as well as the event data.
     * 
     */
    createEventMarker(context, markEvent, eventId) {
        let eventMarker = document.createElement('span');
        eventMarker.classList.add('eventful-event-marker');
        
        if(markEvent){
            const leftVal = context.eventData.clientX;
            const topVal = context.eventData.clientY;
            eventMarker.setAttribute('style', 'left: ' + leftVal + 'px; top: ' + topVal + 'px');
            if (typeof eventId !== 'undefined')
                eventMarker.setAttribute('data-eventid', eventId);
    
            if (context.event.altKey) {// Does different stuff if alt key is pressed.
                eventMarker.style.backgroundColor = 'blue';
            }
            document.body.appendChild(eventMarker);
        }

        return eventMarker;
    }

    logEvent(evt, eventData, el) {
        console.info('************ BEGIN EVENT DATA ***************');
        console.info(evt);
        console.info('************ SAVED EVENT DATA OBJECT ***************');
        console.info(eventData);
        console.info('************ TARGETED ELEMENT ***************');
        console.info(el);
        console.info('************ END EVENT DATA ***************');
    }

    /**
     * @name updateCounter
     * 
     * @param {String} text - message linked to event
     * @param {String} evt - event type associated with tracked event
     * @param {String} sel - selector associated with tracked event
     * 
     * @description - Updates state to increment the counter and change the overview tab content
     * 
     * Currently also creates event marker. That should be a separate function.
     */
    updateCounter(text, evt, el, sel) {
        
        const now = new Date();
        const formattedTime = now.toDateString() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ':' + now.getMilliseconds();

        /**
         * Constructing the event data
         * 
         * This is obviously massively repetitious.
         * It is also extremely inflexible. It doesn't gather enough unique event data for different event types
         * There should be a dictionary in which each event is mapped to an array of props that it will look for.
         * The structure would look like something like this:
         * [{ 'click': {'clientX': evt.clientX,
         *      'clientY': evt.clientY, ...}},
         *  { 'error': {'errorCode': event.path[0].error.code,
         *      'errorMessage': event.path[0].error.message, ...}}
         * ]
         * 
         * I am pretty sure nested objects are a bad idea, but I am not 100% sure how best to avoid them in this situation.
         * I may need to call upon lodash object functions to bail me out of problems with nested objects.
         */

        const eventData = {};
        eventData.event = evt.type;
        eventData.time = formattedTime;
        eventData.selector = sel;
        if (now) eventData.timeStamp = now;

        if (evt.hasOwnProperty('target')) eventData.targetHTML = evt.target.outerHTML;
        if (typeof evt.bubbles !== 'undefined') eventData.bubbles = evt.bubbles;
        eventData.clientX = evt.clientX;
        eventData.clientY = evt.clientY;
        if (evt.hasOwnProperty('screenX')) eventData.screenX = evt.screenX;
        if (evt.hasOwnProperty('screenY')) eventData.screenY = evt.screenY;
        if (evt.hasOwnProperty('altKey')) eventData.altKey = evt.altKey;
        if (evt.hasOwnProperty('cancelable')) eventData.cancelable = evt.cancelable;
        if (evt.type === 'error') {
            eventData.errorCode = evt.path[0].error.code;
            eventData.errorMessage = evt.path[0].error.message;
        } 
        

        if (this.state.logEvent) this.logEvent(evt, eventData, el);

        let context = {
            event: evt,
            eventData: eventData,
            eventId: 'new-event'
        };
        
        const eventMarker = this.createEventMarker(context, this.state.markEvent);
        eventMarker.eventDataObject = context;
        eventMarker.addEventListener('click', this.toggleTooltip, { capture:true });

        if(getStoreLibrary){ // store - currently set-up only for firebase.
            const storeLibrary = getStoreLibrary(this.state.database);
            const dataStore = storeLibrary.database();
            const eventsReference = dataStore.ref('events');
            eventsReference.push({
                event: evt.type,
                eventData: eventData
            });
        }

        const newSelectors = this.state.selectedSelectors.map(function(val){
            if(val.selector === sel && val.event === event.type)
                val.count += 1;
            return val;
        });
        this.setState({
            selectedSelectors: newSelectors,
            latestUpdate: text
        });

        return;

    }

    clearEvents(storeLibrary) {
        if(!storeLibrary) return false;

        let database = storeLibrary.database();

        let eventsRef = database.ref('events');

        eventsRef.remove(function(){
            let markers = document.querySelectorAll('.eventful-event-marker');
            for(var i = 0; i < markers.length; i++) {
                var markerParent = markers[i].parentNode;
                if(markerParent) markerParent.removeChild(markers[i]);
            }
        });
    }

    /**
     * 
     * @name keyboardNavigateEvents
     * 
     * @description - event handler that, if tooltips are visible, allows the left and right arrows to navigate through the tracked events, toggling tooltips as you go.
     * 
     * @param {Event} e 
     */
    keyboardNavigateEvents(e){

        const currentlyTooltipped = document.getElementsByClassName('has-tooltip');
        if(currentlyTooltipped.length > 0){
            
            const curr = currentlyTooltipped[0];
            const nextSib = curr.nextSibling;
            const prevSib = curr.previousSibling;

            if(typeof curr !== 'undefined'){
                if (e.keyCode === 37){
                    if(!!prevSib && !!prevSib.classList && prevSib.classList.contains('eventful-event-marker')) {
                        [].forEach.call(currentlyTooltipped, (el) => {
                            el.classList.remove('has-tooltip');
                            const tooltip = el.getElementsByClassName('eventful-tooltip')[0];
                            el.removeChild(tooltip);
                        });
                        prevSib.click();
                    }
                } else if (e.keyCode === 39){
                    if(!!nextSib && !!nextSib.classList && nextSib.classList.contains('eventful-event-marker')) {
                        [].forEach.call(currentlyTooltipped, (el) => {
                            el.classList.remove('has-tooltip');
                            const tooltip = el.getElementsByClassName('eventful-tooltip')[0];
                            el.removeChild(tooltip);
                        });
                        nextSib.click();
                    }
    
                }
            }

        }
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

    setMarkEvent(doMark) {
        this.setState({
            markEvent: doMark,
        });
        return;
    }

    changeSelectedSelectors(newSelectors) {
        this.setState({
            selectedSelectors: newSelectors
        });
        return;
    }

    render() {
        let activeTabContent = null;

        if (this.state.activeTab === "add") {

            activeTabContent = <TrackingChanger
                pageSelectors = { this.state.pageSelectors }
                pageIds = { this.state.pageIds }
                pageTagNames = { this.state.pageTagNames }
                selectedSelectors = { this.state.selectedSelectors }
                changeSelectedSelectors = { this.changeSelectedSelectors.bind(this) }
                updateCounter = { this.updateCounter.bind(this) }
                logEvent = { this.state.logEvent }
            />;

        } else if (this.state.activeTab === "options") {

            const storeLibrary = getStoreLibrary ? getStoreLibrary(this.state.database) : false;

            activeTabContent = <Options
                pageSelectors = { this.state.pageSelectors }
                selectedSelectors = { this.state.selectedSelectors }
                setLogEvent = { this.setLogEvent.bind(this) }
                setMarkEvent = { this.setMarkEvent.bind(this) }
                clearEvents = { this.clearEvents.bind(this, storeLibrary) }
                logEvent = { this.state.logEvent }
                markEvent = { this.state.markEvent }
            />;

        } else {

            activeTabContent = <Tracker
                latestUpdate = { this.state.latestUpdate }
                selectedSelectors = { this.state.selectedSelectors }
                logEvent = { this.state.logEvent }
                markEvent = { this.state.markEvent }
            />;

        }

        return (
            <div className = "eventful-content-wrapper" >

                <Navbar
                    changeTab = { this.changeTab.bind(this) }
                    activeTab = { this.state.activeTab }
                />

                { activeTabContent }

            </div>
        );
    }
}
