# Eventful
## A little widget that is intended to track events on a page.

This widget, built with a simple React frontend is intended to be used to track live events on elements marked for tracking.

### Current Features
- Events are stored automatically to a firebase account.
- A button is available to clear out the events from the firebase account.
- Ability to add test elements to a page
- Ability to add tracking of a variety of mouse events to elements on a page.
- Tracked events are represented by small red squares in the location where the event occurred.
  - hovering each square triggers a tooltip that displays the gathered event data includin event type, coordinate data, and bubbling information.

### Remaining Tasks
~ Abstract event handling to effectively handle different types of events (currently tested to handle click).
- Create testing
- Set up event unbinding
- Improve the interface to offer:
  - ability to see and manage events tracked on a specific selector
    - list of events tracked on a selector
      - ability to untrack each
      - ability to add new events
      - ability to clearly see history of specific events on a given page.

  - Addition of timestamp to event data
  - Addition of geolocation to event data
  - Addition of different types of events, including pageload events.
  - Persistence of event tracking (via sessionStorage, localStorage, or firebase depending upon persistence needs)
  - Use of clean icons (toggle, settings, event-specific logos, etc.)
  - Styling to gracefully integrate with a given site.
- Improve and secure data storage. No public account data should be available.
  - Convert account data to environment variables
  - Creation of .env.example file for users to fill in their own Firebase data.
- Expose the widget to settings using a vanilla JS library.

#### Lots to do. Enjoy!
