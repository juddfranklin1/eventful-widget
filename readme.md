# Eventful

## Up and Running
* npm install
* npm start

* npm test (runs cypress.io)

* backed by webpack

Data can be stored in Firebase if desired. More options for data storage is a future priority.

## Overview

__A little widget that is intended to track events on a page.__

The Browser is ultra-powerful and it's the hidden engine of so many of our applications. However, the events triggered on a page are mysterious things. Have you ever wondered how frequently mouseenter and mouseleave events are triggered? Did you know that you can target mouseevents that occur when the alt key is held down? Perhaps you would like to know more about the data available in the mousewheel or contextmenu events. The eventful widget is designed to expose data that will give you a window into browser events.

The core of this application is this: a user can place a single script on their page, which will render a react-based widget unobtrusively hidden on the side of the page. The user can then toggle the widget into view and choose elements that they want to track, by picking from a dropdown of css-like selectors scraped from the current page; they can then choose events that they want to track on those elements.

![Closed Widget](https://user-images.githubusercontent.com/1385995/41009827-55516d38-68e8-11e8-8b6c-2cda4f01a2f8.png)
(The widget in it's "closed" state)

By default, the widget will mark where events have occurred on a page, and provide tooltips with event data if the user clicks on the mark. This can be turned on or off. console.logging of event data is also optional.

This widget is built with a simple React frontend. The reason I chose react is that I wanted this to function as a mini-application, with options, state, and a dynamic interface. While react is typically used for SPAs and larger interfaces, this project seemed like a good more modest use-case for a javascript framework. As a learning tool, the overhead of a fairly large javascript file was not much of a concern.

![Open Widget](https://user-images.githubusercontent.com/1385995/41009833-5933c4be-68e8-11e8-9d55-931c2cf90abc.png)
(The widget in it's "open" state)

My intention is that this widget be dropped onto any webpage to allow a user to explore the page in a slightly different light. Cookies are optional, and will be used for session-based persistence of state (and for nothing else). Also, the system is set up to allow a user to supply firebase bucket information for the storage of basic event data to firebase for persistence. Future iterations will allow for different storage options including S3 and localstorage.

To try this out locally, `webpack start` bundles the scripts and then drops them onto a stripped-down html page running on a simple server. This bundle can be placed on any page you like. Namespace collisions are unlikely but certainly not impossible.

The ability to generate simple elements on the page is built into the widget. In terms of events to track, I am starting with the most obvious events like click, mouseenter, mouseleave, etc. Eventually, I would like to provide the ability to track events specific to different elements. So a user can generate an audio tag, which will populate with a simple audio file so that a user can test out tracking of audio events. Similarly, a video tag can be generated for video events. input, textarea, form, table, and other elements that have unique event APIs will be given unique lists of events to track.

## Additional notes on events
[notes on window events](./docs/events-notes.md)
...

### Current Features
- Events are stored automatically to a firebase account.
- On the Options view, a button is available to clear out the events from the firebase account.
- Ability to add test elements to a page
- Ability to add tracking of a variety of mouse events to elements on a page.
- Tracked events are represented by small purple circles in the location where the event occurred.
  - clicking each circle triggers a tooltip that displays the gathered event data including event type, coordinate data, etc.
  - when tooltips are visible, they can be navigated in chronological order by using the left and right arrows, because YOLO.
- Ability to enable or disable logging of event information to the console.
- Basic counting of events tracked on a given selector.
- Ability to remove tracking of events on a given selector.

## To Do
- __npm build__ in case a user simply wants to export a production-compressed version of the widget script.
- Flesh out testing (currently uses Cypress.io).
- reskin to allow for more comprehensive data treatment.
- Find an effective format for displaying data
  - learning about the unique data associated with each event will help with organizing the data into useful and non-useful points.
  - Data delivered with each event can also optionally display a little writeup about each event and what it can be used for.

- Include current url in the stored event data (this would be very useful for much of the persistence functionality described below).

- Enable persistent event tracking.
  - Currently, data used in tooltips can be stored, but more robust and ongoing tracking of events is not enabled by the data that is stored.

- Extend data layer to facilitate S3, localstorage, declare your own, or no storage.
- Improve stored data to include more info on previously interacted-with elements, so that they can be recreated when possible.

- Create dynamic tracking data, such as animating the path of events so that it can be seen how the browser handled bubbling and propagation. This could be done by giving a border or background to each element in the event's path with a delay between each to make it playable.

- Improve UX for adding testing elements.
  - Testing elements should be added in a more flexible, more abstracted way so that a user can more easily test different sorts of elements.
  - Perhaps buttons would be reserved for creating collections of elements, such as forms, tables, lists, or pre-populated video, audio, or other tags.

- Improve ability to sort and explore event data within the widget
  - all events tracked on a specific selector
  - all events of a given type
  - events grouped by session
    - list of events tracked on a selector
  - ability to filter marked events on a given page by type, or by selector.
  - Ability to create charts, graphs, or timelines of events.

- Ability to include as an NPM package.

- Ability to track events not necessarily associated with an element, such as keyboard events.
- Ability to track load events and other non-user-triggered events (requires persistence of tracking).

- Improved ability to unobtrusively integrate with a given site.

#### I know. Lots to do. Please enjoy, suggest, fork, or star stay tuned for updates!
