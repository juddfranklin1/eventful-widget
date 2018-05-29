# Eventful
## A little widget that is intended to track events on a page.

While this is not a necessary tool, it should be a helpful tool for people interested in learning about JavaScript events that occur on the page. The idea is this: Using a react-based widget that functions independently of other elements on a page, a user can use a widget and then choose elements that they want to track, and then select events that they want to track on those elements.


The widget will then mark where events have occurred on a page, and provide tooltips and/or console.logs that describe the past event behavior.

Cookies are used for session-based persistence of tracking (and for nothing else). Also, the system is set up to store very basic event data to firebase.

When running the widget locally, the ability to generate simple elements is built into the widget.

In terms of events to track, I am starting with the most obvious events like click, mouseenter, mouseleave, etc. 

This widget, built with a simple React frontend is intended to be used to track live events on elements marked for tracking.

npm install
npm start
npm build - get the wrapped up js to put onto the website of your choosing.

(yarn can be used if desired)

backed by webpack
data store currently set to AWS, but flexibility in data storage will be provided.

npm test
(testing in mocha)


### Additional Tasks
- Tests
- Update Babel
- Extend data layer to facilitate S3 as well as firebase as well as no storage
- Improve stored data to include more info on previously interacted-with elements, so that they can be recreated when possible.
- Unbinding event tracking
- Improve UX, esp. for adding testing elements.
- Enable ability to include as an NPM package.
- Improve the interface to offer:
  - display options,
  - tabs for different event types,
  - input for creating different types of elements
  - input for toggling the tracking of different events.
  - Use of clean icons (toggle, settings, event-specific logos, etc.)
  - Styling to gracefully integrate with a given site.
- Create a nicely formatted collection of event data.
- Create an API and corresponding data store for tracking event data over time.
- Expose the widget to settings using a vanilla JS library.
- Allow for the dynamic creation of elements.

#### Lots to do. Enjoy!
