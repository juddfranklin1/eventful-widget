/* Stateless Component
* gathers all the classes from the page
* dumps them into a dropdown.
* Once selected, a class is tracked.
* TODO: Offer other selectors
* perhaps integrate sizzle
*/

import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class SelectorPicker extends Component {

  constructor(props){
    
    super();

    this.state = {
      selectValue: ''
    }

  }

  handleChange = (selectedOption) => {

    this.setState({
			selectValue: selectedOption.value,
    });
    
    this.props.selectSelector(selectedOption.value, this.props.eventName);
  }
  
  updateValue = function (newValue) {
    
    this.setState({

    });

  }
  
  render(){

    const selectorOptions = this.props.pageSelectors.map(function(e,i){
        if (e.type === 'class' && e.value.indexOf('.') === -1) {
            e.value = '.' + e.value;
        } else if (e.type === 'id' && e.value.indexOf('#') === -1) {
            e.value = '#' + e.value;
        } else {
          e.value = e.value.toLowerCase();
        }
      return {
        value: e.value, label: e.value
      }
    });

    const label = this.props.eventName + '-label';  

    return (
      <div>
          <label htmlFor={ label }><h4>Pick from the following selectors to track { this.props.eventName && this.props.eventName } events on.</h4>
          
          <Select
            name = { label }
            value = { this.state.selectValue }
            onChange = { this.handleChange }
            options = { selectorOptions }
            id = { label }
            clearable = { false }
            aria-describedby = { 'Choose a selector to track ' + this.props.eventName && this.props.eventName + " events on."}
            aria-label = "Choose selector"
            autoFocus = { true }
          />
        </label>
      </div>
    );
  }
}