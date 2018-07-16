import React from 'react';
import PropTypes from 'prop-types';

const Tooltip = props => {
  const { content } = props;
  return (
    <span className="tooltip">
      <i className="fa fa-info-circle" aria-hidden="true" />
      <span className="tooltip-text">{content}</span>
    </span>
  );
};

Tooltip.propTypes = {
  content: PropTypes.object.isRequired,
};

export default Tooltip;
