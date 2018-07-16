import React from 'react';
import { Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Preview = props => {
  const { trigger, target } = props;
  return (
    <Modal
      size="fullscreen"
      trigger={trigger}
      closeIcon={true}
      className="preview"
      dimmer="blurring"
    >
      <Modal.Content>
        <iframe
          src={target}
          align="middle"
          height="100%"
          width="100%"
          scrolling="yes"
        />
      </Modal.Content>
    </Modal>
  );
};

Preview.propTypes = {
  trigger: PropTypes.object.isRequired,
  target: PropTypes.string.isRequired,
};

export default Preview;
