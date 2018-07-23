# Notes
## Window Events
### beforeunload
This is an event designed it seems to keep a user from accidentally leaving a site too soon. It's probably most useful for ecommerce or registration workflows where premature departure of customers can be a real problem.

when run and returned with a value that is interpreted as a string, the function will trigger a prompt allowing the user to cancel leaving the page or to continue.

It has a unique settable attribute called returnValue. Potential uses for this value could be to store some data in a string that might be useful when the user returns to the site.

It has DOM references to the source element, the current target, the path the event took (only one node as it is does not propagate).

__currentTarget vs. target__

currentTarget always refers to the element to which the event handler has been attached, as opposed to event.target which identifies the element on which the event occurred.
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget)

__isTrusted__

isTrusted only returns false if the event is not triggered by a user action. This means that if I set a listener on the window.resize event to change the window.location to a different site, it will return isTrusted as true.
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted)

### hashChange
Delivers data when the hash at the end of an url is changed. A useful feature of this is a basic history feature wherein you can see the previous and the current hash value. This can help with **undo**-like or 'time travel' features. It also can allow for the creation of unique navigation behaviors between specific hash changes. This could be useful for a game or for security purposes (a hash could actually be a security hash, and the second hash could be the key for translating it.)
