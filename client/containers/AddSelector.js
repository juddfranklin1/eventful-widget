import React from 'react';
import { connect } from 'react-redux';
import { addSelector } from '../actions';

const AddSelector = ({ dispatch }) => {
  let input;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addSelector(input.value))
          input.value = ''
        }}
      >
        <input ref={node => input = node} />
        <button type="submit">
          Add Selector
        </button>
      </form>
    </div>
  );
};

export default connect()(AddSelector);