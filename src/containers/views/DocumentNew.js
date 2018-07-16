import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Prompt, Link } from 'react-router-dom';
import { HotKeys } from 'react-hotkeys';
import DocumentTitle from 'react-document-title';
import Splitter from '../../components/Splitter';
import Errors from '../../components/Errors';
import Breadcrumbs from '../../components/Breadcrumbs';
import Button from '../../components/Button';
import InputPath from '../../components/form/InputPath';
import InputTitle from '../../components/form/InputTitle';
import MarkdownEditor from '../../components/MarkdownEditor';
import Metadata from '../../containers/MetaFields';
import { updateTitle, updateBody, updatePath } from '../../ducks/metadata';
import {
  createDocument,
  // clearUpdated,
} from '../../ducks/collections';
import { clearErrors } from '../../ducks/utils';
import { injectDefaultFields } from '../../utils/metadata';
import { capitalize, preventDefault } from '../../utils/helpers';
import { ADMIN_PREFIX } from '../../constants';

export class DocumentNew extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.updated !== prevProps.updated) {
      // if (this.props.updated !== true) {
      const { path, collection } = this.props.currentDocument;
      const splat = path.substr(path.indexOf('/') + 1, path.length);
      this.props.history.push(
        `${ADMIN_PREFIX}/pages/${collection}/${splat}` // remove Jekyll's `_` preceding top-level collection dir
      );
      // const { clearUpdated } = this.props;
      // clearUpdated();
    }
  }

  componentWillUnmount() {
    const { clearErrors, errors } = this.props;
    errors.length && clearErrors();
  }

  getLeaveMessage() {
    return 'You have unsaved changes on this page. All changes will be lost. Are you sure you want to leave?';
  }

  handleClickSave = e => {
    preventDefault(e);
    const { fieldChanged, createDocument } = this.props;
    const { params } = this.props.match;
    if (fieldChanged) {
      const { collection_name, splat } = params;
      createDocument(collection_name, splat);
    }
  };
  handleClickCancel = e => {
    preventDefault(e);
    const { params } = this.props.match;
    const collection = params.collection_name;
    const directory = params.splat;
    this.props.history.push(
      `${ADMIN_PREFIX}/pages/${collection}/${directory || ''}`
    );
  };

  render() {
    const {
      errors,
      updated,
      updateTitle,
      updateBody,
      updatePath,
      fieldChanged,
      config,
      match: { params: params },
    } = this.props;
    const keyboardHandlers = {
      save: this.handleClickSave,
    };

    const collection = params.collection_name;
    const link = `${ADMIN_PREFIX}/pages/${collection}`;

    const metafields = injectDefaultFields(config, params.splat, collection);

    const document_title = params.splat
      ? `New document - ${params.splat} - ${capitalize(collection)}`
      : `New document - ${capitalize(collection)}`;

    return (
      <DocumentTitle title={document_title}>
        <HotKeys handlers={keyboardHandlers} className="single">
          {errors.length > 0 && <Errors errors={errors} />}
          <Prompt
            when={this.props.fieldChanged}
            message={this.getLeaveMessage()}
          />
          <div className="content-header">
            <Breadcrumbs type={collection} splat={params.splat || ''} />
          </div>

          <div className="content-wrapper">
            <div className="content-body">
              <InputPath onChange={updatePath} type={collection} path="" />
              <InputTitle onChange={updateTitle} title="" ref="title" />
              <MarkdownEditor
                onChange={updateBody}
                onSave={this.handleClickSave}
                placeholder="Body"
                initialValue=""
                ref="editor"
              />
              <Splitter />
              <Metadata fields={metafields} />
            </div>

            <div className="content-side">
              <Button
                onClick={this.handleClickSave}
                type="create"
                active={fieldChanged}
                triggered={updated}
                icon="plus-square"
                size="block"
              />
              <br />
              <br />
              <Button
                onClick={this.handleClickCancel}
                type="cancel"
                active={true}
                icon="remove"
                size="block"
              />
            </div>
          </div>
        </HotKeys>
      </DocumentTitle>
    );
  }
}

DocumentNew.propTypes = {
  currentDocument: PropTypes.object.isRequired,
  createDocument: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  // clearUpdated: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  updated: PropTypes.bool.isRequired,
  config: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  currentDocument: state.collections.currentDocument,
  fieldChanged: state.metadata.fieldChanged,
  errors: state.utils.errors,
  updated: state.collections.updated,
  config: state.config.config,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateTitle,
      updateBody,
      updatePath,
      createDocument,
      clearErrors,
      // clearUpdated,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentNew);
