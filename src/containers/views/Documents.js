import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import moment from 'moment';
import DocumentTitle from 'react-document-title';
import Breadcrumbs from '../../components/Breadcrumbs';
import Button from '../../components/Button';
import { fetchCollection, deleteDocument } from '../../ducks/collections';
import { viewedDocuments, showDocumentsTour, noTour } from '../../ducks/tour';
// import { search } from '../../ducks/utils';
import { capitalize } from '../../utils/helpers';
import { ADMIN_PREFIX } from '../../constants';
import { Icon, Table, Loader, Dimmer } from 'semantic-ui-react';
import Preview from '../../components/Preview';
import { toastr } from 'react-redux-toastr';
import Tour from '../Tour';
import TourPrompt from '../../components/TourPrompt';

export class Documents extends Component {
  componentDidMount() {
    const { fetchCollection } = this.props;
    const { params } = this.props.match;
    fetchCollection(params.collection_name, params.splat);
  }

  componentDidUpdate(prevProps) {
    if (this.props.updated !== prevProps.updated) {
      // if (this.props.updated !== true) {
      const { fetchCollection } = this.props;
      const { params } = this.props.match;
      fetchCollection(params.collection_name, params.splat);
      // const { clearUpdated } = this.props;
      // clearUpdated();
    }
  }

  getDeleteMessage(filename) {
    return `Are you sure that you want to delete "${filename}"?`;
  }

  getNotFoundMessage(type) {
    return `No ${type} found.`;
  }

  handleClickDelete(filename) {
    const { deleteDocument } = this.props;
    const { params } = this.props.match;

    const modalConfig = {
      onOk: () => {
        deleteDocument(params.collection_name, params.splat, filename);
      },
      onCancel: () => null,
    };

    toastr.confirm(this.getDeleteMessage(filename), modalConfig);
  }

  handleClickLink(event, to) {
    event.preventDefault();

    this.props.history.push(to);
  }

  renderTour() {
    const { showDocsTour } = this.props;
    return showDocsTour && <Tour tourType="documents" />;
  }

  renderTourPrompt() {
    const {
      documentsTour,
      noTour,
      showDocumentsTour,
      showDocsTour,
    } = this.props;
    return (
      documentsTour &&
      !showDocsTour && (
        <TourPrompt
          tourType="documents"
          handleNoClick={noTour}
          handleYesClick={showDocumentsTour}
        />
      )
    );
  }

  renderTable() {
    return (
      <div className="documents-content">
        <Table striped unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.renderRows()}</Table.Body>
        </Table>
      </div>
    );
  }

  renderRows() {
    const { documents } = this.props;
    return _.map(documents, entry => {
      if (entry.type && entry.type == 'directory') {
        return this.renderDirectoryRow(entry);
      } else {
        return this.renderFileRow(entry);
      }
    });
  }

  renderDirectoryRow(directory) {
    const {
      params: { collection_name },
    } = this.props.match;
    const { name, path, modified_time } = directory;
    const splat = path.substr(path.indexOf('/') + 1, path.length);
    const to = `${ADMIN_PREFIX}/pages/${collection_name}/${splat}`;
    // date w/o timezone
    let date = modified_time.substring(0, modified_time.lastIndexOf(' '));
    date = moment(date).format('ll');
    return (
      <Table.Row key={name}>
        <Table.Cell collapsing>
          <strong>
            <Link onClick={event => this.handleClickLink(event, to)} to={to}>
              <Icon name="folder" aria-hidden="true" />
              {name}
            </Link>
          </strong>
        </Table.Cell>
        <Table.Cell colSpan="2">{date}</Table.Cell>
      </Table.Row>
    );
  }

  renderFileRow(doc) {
    const { id, name, title, http_url, collection, path } = doc;
    const splat = path.substr(path.indexOf('/') + 1, path.length);
    const to = `${ADMIN_PREFIX}/pages/${collection}/${splat}`;
    // date w/o timezone
    let date = doc.date.substring(0, doc.date.lastIndexOf(' '));
    date = moment(date).format('ll');

    return (
      <Table.Row key={id}>
        <Table.Cell collapsing>
          <strong>
            <Link to={to}>
              <Icon name="file text" aria-hidden="true" />
              {name}
            </Link>
          </strong>
        </Table.Cell>
        <Table.Cell>{date}</Table.Cell>
        <Table.Cell textAlign="right">
          <div>
            <Button
              onClick={() => this.handleClickDelete(name)}
              type="delete"
              icon="trash"
              active={true}
              weight="thin"
              compact
            />
            {http_url && (
              <Preview
                trigger={
                  <Button
                    type="view"
                    icon="eye"
                    active={true}
                    weight="thin"
                    compact
                  />
                }
                target={http_url}
              />
            )}
            <Link to={to} tabIndex="-1">
              <Button
                type="edit"
                icon="pencil-square-o"
                active={true}
                target="_self"
                weight="thin"
                compact
              />
            </Link>
          </div>
        </Table.Cell>
      </Table.Row>
    );
  }

  render() {
    const { isFetching, documents } = this.props;
    // const { search } = this.props;
    const { params } = this.props.match;
    const { collection_name } = params;

    if (isFetching) {
      return (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      );
    }

    const splat = params.splat || '';
    const to = params.splat
      ? `${ADMIN_PREFIX}/pages/${collection_name}/${splat}/new`
      : `${ADMIN_PREFIX}/pages/${collection_name}/new`;

    const document_title = params.splat
      ? `${params.splat} | ${capitalize(collection_name)}`
      : capitalize(collection_name);

    return (
      <DocumentTitle title={document_title}>
        <div>
          <div className="content-header">
            <Breadcrumbs
              type={collection_name}
              splat={splat}
              history={this.props.history}
            />
            <span className="pull-right">
              <div className="page-buttons">
                <Link to={to} tabIndex="-1">
                  <Button type="new" active={true} target="_self" prominent />
                </Link>
              </div>
            </span>
          </div>
          {documents.length > 0 ? (
            this.renderTable()
          ) : (
            <h1>{this.getNotFoundMessage('documents')}</h1>
          )}
          {this.renderTourPrompt()}
          {this.renderTour()}
        </div>
      </DocumentTitle>
    );
  }
}

Documents.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  documents: PropTypes.array.isRequired,
  fetchCollection: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  // clearUpdated: PropTypes.func.isRequired,
  // search: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  updated: PropTypes.bool.isRequired,
  documentsTour: PropTypes.bool.isRequired,
  viewedDocuments: PropTypes.func.isRequired,
  noTour: PropTypes.func.isRequired,
  showDocumentsTour: PropTypes.func.isRequired,
  showDocsTour: PropTypes.bool.isRequired,
  config: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  // documents: filterBySearchInput(state.collections.entries, state.utils.input),
  documents: state.collections.entries,
  isFetching: state.collections.isFetching,
  updated: state.collections.updated,
  documentsTour: state.tour.documentsTour,
  showDocsTour: state.tour.showDocsTour,
  config: state.config.config,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCollection,
      deleteDocument,
      viewedDocuments,
      noTour,
      showDocumentsTour,
      // search,
      // clearUpdated,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Documents);
