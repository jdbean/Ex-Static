import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class MetaButtons extends Component {
  handleRemoveClick() {
    const { onRemoveClick } = this.props;
    onRemoveClick();
  }

  render() {
    const { onDropdownFocus, onDropdownBlur } = this.props;
    return (
      <div className="meta-buttons">
        <span className="dropdown">
          <a
            onFocus={() => onDropdownFocus()}
            onBlur={() => onDropdownBlur()}
            className="meta-button"
            tabIndex="1"
          >
            <i className="fa fa-chevron-down" />
          </a>
          <div className="dropdown-wrap">
            <span
              onMouseDown={() => this.handleRemoveClick()}
              className="remove-field"
            >
              <i className="fa fa-trash-o" />Remove field
            </span>
          </div>
        </span>
      </div>
    );
  }
}

MetaButtons.propTypes = {
  onRemoveClick: PropTypes.func.isRequired,
  onDropdownFocus: PropTypes.func.isRequired,
  onDropdownBlur: PropTypes.func.isRequired,
};

export default MetaButtons;
