import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import MetaField from '../components/metadata/MetaField';
import Tooltip from '../components/Tooltip';
import {
  storeContentFields,
  addField,
  removeField,
  updateFieldKey,
  updateFieldValue,
} from '../ducks/metadata';

export class MetaFields extends Component {
  componentDidMount() {
    const { storeContentFields, fields } = this.props;
    storeContentFields(fields);
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.metadata, this.props.metadata);
  }

  render() {
    const {
      metadata,
      addField,
      removeField,
      updateFieldKey,
      updateFieldValue,
      key_prefix,
    } = this.props;

    let visibleKeys = _.omit(metadata, ['title', 'path', 'raw_content']);

    const metafields = _.map(visibleKeys, (field, key) => {
      return (
        <MetaField
          key={key}
          key_prefix={key_prefix}
          type="simple"
          parentType="top"
          fieldKey={key}
          fieldValue={field}
          addField={addField}
          removeField={removeField}
          updateFieldKey={updateFieldKey}
          updateFieldValue={updateFieldValue}
          nameAttr={`metadata['${key}']`}
          namePrefix={`metadata`}
        />
      );
    });

    const newWrapper = (
      <div className="meta-new">
        <a onClick={() => addField('metadata')} className="tooltip">
          <i className="fa fa-plus-circle" /> New metadata field
          <span className="tooltip-text">
            Each <b>metadata</b> contains two fields: a <b>key</b> or the the
            type of metadata, and a <b>value</b>.
          </span>
        </a>
        <small className="tooltip pull-right">
          <i className="fa fa-info-circle" />Special Keys
          <span className="tooltip-text">
            You can use special keys like <b>date</b> for user-friendly
            functionalities.
          </span>
        </small>
      </div>
    );

    const tooltipText = (
      <span>
        Enter <b>metadata fields</b> in this form. These fields will populate
        your post's{' '}
        <a href="https://jekyllrb.com/docs/frontmatter/"> YAML front matter</a>.
        With information such as date, layout, author & category tags if your
        blog supports these features. Click the new metadata field button to{' '}
        <b>add new fields</b> and use the drop down to the right to{' '}
        <b>remove fields</b>.
      </span>
    );

    return (
      <div className="metafields-wrapper">
        <label>
          Metadata Fields
          <Tooltip content={tooltipText} />
        </label>
        <div className="metafields-wrapper">
          {metafields}
          {newWrapper}
        </div>
      </div>
    );
  }
}

MetaFields.propTypes = {
  fields: PropTypes.object.isRequired,
  metadata: PropTypes.object.isRequired,
  key_prefix: PropTypes.string.isRequired,
  storeContentFields: PropTypes.func.isRequired,
  addField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  updateFieldKey: PropTypes.func.isRequired,
  updateFieldValue: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  metadata: state.metadata.metadata,
  key_prefix: state.metadata.key_prefix,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      storeContentFields,
      addField,
      removeField,
      updateFieldKey,
      updateFieldValue,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetaFields);
