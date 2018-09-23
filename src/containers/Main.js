import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HotKeys } from 'react-hotkeys';
import DocumentTitle from 'react-document-title';

import { fetchConfig } from '../ducks/config';
import { enableTour } from '../ducks/tour';
import keyboardShortcuts from '../constants/keyboardShortcuts';
import Routes from './Routes';

class App extends Component {
  componentDidMount() {
    const { fetchConfig } = this.props;
    fetchConfig();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.updated !== nextProps.updated) {
  //     const { fetchConfig } = this.props;
  //     fetchConfig();
  //   }
  // }

  activateTour() {
    const { enableTour } = this.props;
    const { exstaticTourEnabled } = this.props.config.content;
    exstaticTourEnabled && enableTour();
  }

  render() {
    const { config, isFetching } = this.props;

    if (isFetching) {
      return null;
    }

    config.content && this.activateTour();

    return (
      <DocumentTitle title="Ex-Static">
        <HotKeys keyMap={keyboardShortcuts} className="wrapper">
          {config.content && <Routes config={config} />}
        </HotKeys>
      </DocumentTitle>
    );
  }
}

App.propTypes = {
  fetchConfig: PropTypes.func.isRequired,
  enableTour: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  // viewedDocuments: PropTypes.bool.isRequired,
  updated: PropTypes.bool,
};

const mapStateToProps = state => ({
  config: state.config.config,
  updated: state.config.updated,
  isFetching: state.config.isFetching,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchConfig, enableTour }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
