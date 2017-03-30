import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ClickCounter from './click-counter.js';
import ElementAdder from './add-element.js';
import PickASelector from './pick-a-selector.js';

class WidgetWrapper extends Component {
  /* This class will contain all the inner workings of the Widget
   * Its chief role will be to manage which view of the widget is Active.
   * The current idea for the widget would be to provide a few sub-interfaces.
   * 1) A default interface (accessed by a house icon): a cookie can be set to keep this at the last state.
   *    a. This interface should give users the ability to track their previously tracked elements.
   *    b. It should also provide a nice overview of data tracked.
   *        i. Specifically, it should note the number of elements tracked, the number of events that have been registered, etc.
   * 2) An options interface (gear or wrench icon)
   *    a. allowing a user to track a particular selector for a specific event
   *    b. The user should be able to pick from selectors farmed from the current page, or to add their own.
   *    c. To make this possible, this would need to be a form with a dropdown, and a text input submitted via a button click event.
   * 3) Add tracker interface (accessed by a plus sign icon), allowing a user to 
  */
  constructor(props){
    super();
  }
  render(){
    return (
      <div>
        <ClickCounter clickCount={ this.props.counter } element={ this.props.activeElement } className="eventfulClickCounter" />
        <ElementAdder elementName="merp" onClick={ (name) => this.props.addElement(name) } />
        <ElementAdder elementName="derp" onClick={ (name) => this.props.addElement(name) } />
        <PickASelector selectedClasses={ this.props.selectedClasses } pageClasses={ this.props.pageClasses } selectClass={ (sel) => this.props.selectClass(sel) } />
      </div>
    );
  }
}

export default WidgetWrapper;