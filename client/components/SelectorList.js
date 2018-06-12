import React from 'react';
import PropTypes from 'prop-types';
import Selector from './Selector';

const SelectorList = ({ selectors, toggleSelected }) => (
  <ul>
    {selectors.map(selector =>
      <Selector
        key={selector.id}
        {...selector}
        onClick={() => toggleSelected(selector.id)}
      />
    )}
  </ul>
);

SelectorList.propTypes = {
  selectors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      selected: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  toggleSelected: PropTypes.func.isRequired
};

export default SelectorList;