import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import {
//   viewedDocuments,
//   viewedDocumentsEdit,
//   noTour
// } from '../ducks/tour';

const TourPrompt = props => {
  const { handleNoClick, handleYesClick } = props;

  return (
    <Modal dimmer="blurring" defaultOpen>
      <Modal.Header>Welcome to Ex-Static!</Modal.Header>
      <Modal.Content>
        <p>
          Hi There! It seems that you might be new around here; would you like a
          tour to help you get the hang of things? If so, please press the
          button marked 'yes'. If you get lost keep your eyes out for the
          pulsing purple dot to get back on track.
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="orange" onClick={handleNoClick} content="No Thanks" />
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content="Yes"
          onClick={handleYesClick}
        />
      </Modal.Actions>
    </Modal>
  );
};

TourPrompt.propTypes = {
  handleNoClick: PropTypes.func.isRequired,
  handleYesClick: PropTypes.func.isRequired,
};

export default TourPrompt;
