/* Stateless Component
* gathers all the classes from the page
* dumps them into a dropdown.
* Once selected, a class is tracked.
* TODO: Offer other selectors
* perhaps integrate sizzle
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
    
    this.props.selectClass(selectedOption.value, this.props.eventName);
  }
  
  updateValue = function (newValue) {
    console.log(newValue);

  }
  
  render(){

    const selectorOptions = this.props.pageClasses.map((e,i)=>( { value: e, label: e } ));

    const label = this.props.eventName + '-label';  

    return (
      <div>
        <label htmlFor={ label }><h4>Pick from existing page classes to track { this.props.eventName && this.props.eventName } events on.</h4>
          <Select
            name={ label }
            value={ this.state.selectValue }
            onChange={ this.handleChange }
            options={ selectorOptions }
            id={ label }
          />
        </label>
      </div>
    );
  }
}