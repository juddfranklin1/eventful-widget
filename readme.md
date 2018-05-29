# Eventful

## Up and Running
npm install
npm start
npm test
(testing in mocha)

(yarn can be used if desired)

backed by webpack
data store currently set to AWS, but flexibility in data storage will be provided.

## A little widget that is intended to track events on a page.

While this is not a necessary tool, it should be a helpful tool for people interested in learning about JavaScript events that occur on the page. The idea is this: Using a react-based widget that functions independently of other elements on a page, a user can use a widget and then choose elements that they want to track, and then select events that they want to track on those elements.

The widget will mark where events have occurred on a page, and provide tooltips and/or console.logs that describe the past event behavior. This widget, is built with a simple React frontend. It is intended to be droppable onto any webpage and allow you to track events of your choosing on elements of your choosing. Cookies are used for session-based persistence of tracking (and for nothing else). Also, the system is set up to store very basic event data to firebase for future reference.

To try this out locally, webpack starts bundles the scripts and then drops them onto a simple html page running on a simple server. This bundle can be placed on any page you like. Namespace collisions are extremely unlikely but certainly not impossible.

The ability to generate simple elements on the page is built into the widget. In terms of events to track, I am starting with the most obvious events like click, mouseenter, mouseleave, etc.

### Current Features
- Events are stored automatically to a firebase account.
- A button is available to clear out the events from the firebase account.
- Ability to add test elements to a page
- Ability to add tracking of a variety of mouse events to elements on a page.
- Tracked events are represented by small red squares in the location where the event occurred.
  - hovering each square triggers a tooltip that displays the gathered event data includin event type, coordinate data, and bubbling information.

### Remaining Tasks
## To Do
- npm build
- Tests
- Update Babel
- Extend data layer to facilitate S3 as well as firebase as well as no storage
- Improve stored data to include more info on previously interacted-with elements, so that they can be recreated when possible.
- Unbinding event tracking
- Improve UX, esp. for adding testing elements.
  - ability to see and manage events tracked on a specific selector
    - list of events tracked on a selector
      - ability to untrack each
      - ability to add new events
      - ability to clearly see history of specific events on a given page.

- Enable ability to include as an NPM package.
- Event unbinding
- Improve event data:
  - element data
  - event-specific data such as the key pressed in a keydown or keyup event.
  - timestamp
  - geolocation
  - addition of different events and extension to non user-triggered events.

- Use of clean icons (toggle, settings, event-specific logos, etc.)
- Styling to gracefully integrate with a given site.

#### I know. Lots to do. Enjoy for now and please stay tuned for updates!
