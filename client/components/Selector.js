import React from 'react';
import PropTypes from 'prop-types';

const Selector = ({ onClick, selected, text }) => (
  <li
    onClick={onClick}
    style={ {
      color: selected ? 'green' : 'black'
    }}
  >
    {text}
  </li>
);

Selector.propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired }
export default Selector;