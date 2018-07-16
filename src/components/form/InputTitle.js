import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import Tooltip from '../Tooltip';

export default class InputTitle extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.title !== this.props.title;
  }

  handleChange = e => {
    const { onChange } = this.props;
    onChange(e.target.value);
  };

  render() {
    const { title } = this.props;

    const tooltipText = (
      <span>
        Choose a <b>title</b> for your post.
      </span>
    );

    return (
      <div className="input-title">
        <label>
          Title
          <Tooltip content={tooltipText} />
        </label>
        <TextareaAutosize
          onChange={this.handleChange}
          placeholder="Title"
          defaultValue={title}
          ref="input"
        />
      </div>
    );
  }
}

InputTitle.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
