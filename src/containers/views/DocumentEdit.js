import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Prompt, Link } from 'react-router-dom';
import _ from 'underscore';
import { HotKeys } from 'react-hotkeys';
import DocumentTitle from 'react-document-title';
import Splitter from '../../components/Splitter';
import Errors from '../../components/Errors';
import Breadcrumbs from '../../components/Breadcrumbs';
import Button from '../../components/Button';
import { Button as SemanticButton } from 'semantic-ui-react';
import InputPath from '../../components/form/InputPath';
import InputTitle from '../../components/form/InputTitle';
import MarkdownEditor from '../../components/MarkdownEditor';
import Metadata from '../../containers/MetaFields';
import {
  fetchDocument,
  deleteDocument,
  putDocument,
  // clearUpdated,
} from '../../ducks/collections';
import {
  viewedDocumentsEdit,
  showDocumentsEditTour,
  noTour,
} from '../../ducks/tour';
import { updateTitle, updateBody, updatePath } from '../../ducks/metadata';
import { clearErrors } from '../../ducks/utils';
import { injectDefaultFields } from '../../utils/metadata';
import { capitalize, preventDefault } from '../../utils/helpers';
import { ADMIN_PREFIX } from '../../constants';
import Preview from '../../components/Preview';
import { toastr } from 'react-redux-toastr';
import Tour from '../Tour';
import TourPrompt from '../../components/TourPrompt';

export class DocumentEdit extends Component {
  componentDidMount() {
    const { fetchDocument } = this.props;
    const { params } = this.props.match;
    const filename = [`${params['0']}.${params['1']}`].join('.');
    fetchDocument(params.collection_name, params.splat, filename);
  }

  componentDidUpdate(prevProps) {
    if (this.props.updated !== prevProps.updated) {
      // if (this.props.updated === true) {
      if (_.isEmpty(this.props.currentDocument)) {
        const { params } = this.props.match;
        const collection = params.collection_name;
        const directory = params.splat;
        this.props.history.push(
          `${ADMIN_PREFIX}/pages/${collection}/${directory || ''}`
        );
      } else {
        const old_path = prevProps.currentDocument.path;
        const path = this.props.currentDocument.path;
        // redirect if the path is changed
        if (old_path !== path) {
          this.props.history.push(
            `${ADMIN_PREFIX}/pages/${path.substring(1)}` // remove Jekyll's `_`
          );
        }
        // const { clearUpdated } = this.props;
        // clearUpdated();
      }
    }
  }

  componentWillUnmount() {
    const { clearErrors, errors } = this.props;
    errors.length && clearErrors();
  }

  getDeleteMessage(filename) {
    return `Are you sure that you want to delete "${filename}"? This action is irreversible.`;
  }

  getLeaveMessage() {
    return 'You have unsaved changes on this page. All changes will be lost. Are you sure you want to leave?';
  }

  getNotFoundMessage(type) {
    return `No ${type} found.`;
  }

  handleClickSave = e => {
    preventDefault(e);
    const { putDocument, fieldChanged } = this.props;
    const { params } = this.props.match;
    if (fieldChanged) {
      const collection = params.collection_name;
      const filename = [`${params['0']}.${params['1']}`].join('.');
      putDocument(collection, params.splat, filename);
    }
  };

  handleClickDelete = () => {
    const { deleteDocument } = this.props;
    const { params } = this.props.match;
    const filename = [`${params['0']}.${params['1']}`].join('.');

    const modalConfig = {
      onOk: () => {
        const collection = params.collection_name;
        const directory = params.splat;
        deleteDocument(collection, directory, filename);
      },
      onCancel: () => null,
    };

    toastr.confirm(this.getDeleteMessage(filename), modalConfig);
  };

  renderTour() {
    const { showDocsEditTour } = this.props;
    return showDocsEditTour && <Tour tourType="edit/new" />;
  }

  renderTourPrompt() {
    const {
      documentsEditTour,
      noTour,
      showDocumentsEditTour,
      showDocsEditTour,
    } = this.props;
    return (
      documentsEditTour &&
      !showDocsEditTour && (
        <TourPrompt
          tourType="documents"
          handleNoClick={noTour}
          handleYesClick={showDocumentsEditTour}
        />
      )
    );
  }

  render() {
    const {
      isFetching,
      currentDocument,
      errors,
      updateTitle,
      updateBody,
      updatePath,
      updated,
      fieldChanged,
      config,
    } = this.props;

    const { params } = this.props.match;

    if (isFetching) {
      return null;
    }

    if (_.isEmpty(currentDocument)) {
      return <h1>{this.getNotFoundMessage('document')}</h1>;
    }

    const {
      title,
      raw_content,
      http_url,
      collection,
      front_matter,
      name,
    } = currentDocument;

    const directory = params.splat;

    const metafields = injectDefaultFields(
      config,
      directory,
      collection,
      front_matter
    );

    const keyboardHandlers = {
      save: this.handleClickSave,
    };

    const document_title = directory
      ? `${title} - ${directory} - ${capitalize(collection)}`
      : `${title} - ${capitalize(collection)}`;

    return (
      <DocumentTitle title={document_title}>
        <HotKeys handlers={keyboardHandlers} className="single">
          {errors.length > 0 && <Errors errors={errors} />}
          <Prompt
            when={this.props.fieldChanged}
            message={this.getLeaveMessage()}
          />

          <div className="content-header">
            <Breadcrumbs splat={directory || ''} type={collection} />
          </div>

          <div className="content-wrapper">
            <div className="content-body">
              <InputPath onChange={updatePath} type={collection} path={name} />
              <InputTitle onChange={updateTitle} title={title} ref="title" />
              <MarkdownEditor
                onChange={updateBody}
                onSave={this.handleClickSave}
                placeholder="Body"
                initialValue={raw_content}
                ref="editor"
              />
              <Splitter />
              <Metadata
                fields={{ title, path: name, raw_content, ...metafields }}
              />
            </div>

            <div className="content-side">
              <Button
                onClick={this.handleClickSave}
                type="save"
                active={fieldChanged}
                triggered={updated}
                icon="save"
                weight="block"
              />
              <Splitter />
              {http_url && (
                <SemanticButton.Group className="or-fix">
                  <a href={http_url} target="_blank" tabIndex="-1">
                    <Button type="visit" icon={null} active={true} />
                  </a>
                  <SemanticButton.Or />
                  <Preview
                    trigger={<Button type="view" icon={null} active={true} />}
                    target={http_url}
                  />
                </SemanticButton.Group>
              )}
              <Splitter />
              <Button
                onClick={this.handleClickDelete}
                type="delete"
                active={true}
                icon="trash"
                weight="block"
              />
            </div>
            {this.renderTourPrompt()}
            {this.renderTour()}
          </div>
        </HotKeys>
      </DocumentTitle>
    );
  }
}

DocumentEdit.propTypes = {
  currentDocument: PropTypes.object.isRequired,
  fetchDocument: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  // clearUpdated: PropTypes.func.isRequired,
  putDocument: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  updated: PropTypes.bool.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  documentsEditTour: PropTypes.bool.isRequired,
  viewedDocumentsEdit: PropTypes.func.isRequired,
  noTour: PropTypes.func.isRequired,
  showDocumentsEditTour: PropTypes.func.isRequired,
  showDocsEditTour: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  currentDocument: state.collections.currentDocument,
  isFetching: state.collections.isFetching,
  fieldChanged: state.metadata.fieldChanged,
  updated: state.collections.updated,
  errors: state.utils.errors,
  config: state.config.config,
  documentsEditTour: state.tour.documentsEditTour,
  showDocsEditTour: state.tour.showDocsEditTour,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchDocument,
      deleteDocument,
      putDocument,
      updateTitle,
      updateBody,
      updatePath,
      clearErrors,
      viewedDocumentsEdit,
      noTour,
      showDocumentsEditTour,
      // clearUpdated,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentEdit);
