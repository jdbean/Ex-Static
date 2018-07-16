import React from 'react';
import PropTypes from 'prop-types';
import { Button as SemanticButton } from 'semantic-ui-react';

const Labels = {
  save: {
    label: 'Save',
    triggeredLabel: 'Saved',
  },
  create: {
    label: 'Create',
    triggeredLabel: 'Created',
  },
  delete: {
    label: 'Delete',
  },
  view: {
    label: 'View',
  },
  edit: {
    label: 'Edit',
  },
  cancel: {
    label: 'Cancel',
  },
  visit: {
    label: 'Visit',
  },
  new: {
    label: 'New Post',
  },
};

export default function Button({
  type,
  active,
  triggered,
  onClick,
  block,
  thin,
  icon,
  to,
  target,
  weight,
  compact,
  prominent,
  fluid,
}) {
  let label = '';
  let triggeredLabel = '';
  switch (type) {
    case 'save':
      label = Labels.save.label;
      triggeredLabel = Labels.save.triggeredLabel;
      break;
    case 'create':
      label = Labels.create.label;
      triggeredLabel = Labels.create.triggeredLabel;
      break;
    case 'delete':
      label = Labels.delete.label;
      break;
    case 'view':
      label = Labels.view.label;
      break;
    case 'visit':
      label = Labels.visit.label;
      break;
    case 'edit':
      label = Labels.edit.label;
      break;
    case 'new':
      label = Labels.new.label;
      break;
    case 'cancel':
      label = Labels.cancel.label;
      break;
    default:
  }

  let color = '';
  switch (type) {
    case 'save':
    case 'create':
    case 'edit':
      color = 'green';
      break;
    case 'view':
      color = 'yellow';
      break;
    case 'visit':
      color = 'purple';
      break;
    case 'cancel':
    case 'delete':
      color = 'orange';
      break;
    case 'new':
      color = 'blue';
      break;
    default:
      color = 'blue';
  }

  let size = '';
  switch (weight) {
    case 'thin':
      size = 'mini';
      break;
    case 'block':
      size = 'medium';
      break;
    default:
      size = 'medium';
  }

  return (
    <SemanticButton
      color={color}
      target={target ? target : '_blank'}
      onClick={to ? null : onClick}
      className={prominent ? null : 'hover-color'}
      size={size}
      compact={compact ? true : false}
      disabled={active ? false : true}
      fluid={fluid ? true : false}
    >
      {icon && <i className={`fa fa-${icon}`} aria-hidden="true" />}
      <span>{triggered ? triggeredLabel : label}</span>
    </SemanticButton>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  triggered: PropTypes.bool,
  block: PropTypes.bool,
  thin: PropTypes.bool,
  icon: PropTypes.string,
  to: PropTypes.string,
  target: PropTypes.string,
  weight: PropTypes.string,
  compact: PropTypes.bool,
  prominent: PropTypes.bool,
  fluid: PropTypes.bool,
  disabled: PropTypes.bool,
};
