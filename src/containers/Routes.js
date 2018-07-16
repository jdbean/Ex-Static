import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Header from './Header';
import Documents from './views/Documents';
import DocumentEdit from './views/DocumentEdit';
import DocumentNew from './views/DocumentNew';
import NotFound from './views/NotFound';
import { ADMIN_PREFIX } from '../constants';

function getPathDepth(location) {
  let pathArr = (location || {}).pathname.split('/');
  pathArr = pathArr.filter(n => n !== '');
  return pathArr.length;
}

class Routes extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      prevDepth: getPathDepth(props.location),
    };
  }

  componentWillReceiveProps() {
    this.setState({ prevDepth: getPathDepth(this.props.location) });
  }

  render() {
    return (
      <div className="container">
        <Header config={this.props.config.content} />
        <Route
          render={({ location }) => {
            return (
              <TransitionGroup component={null}>
                <CSSTransition
                  key={location.pathname}
                  timeout={800}
                  classNames="pageSlider"
                  unmountOnExit={true}
                  exit={false}
                >
                  <div
                    className={
                      getPathDepth(location) - this.state.prevDepth >= 0
                        ? 'left'
                        : 'right'
                    }
                  >
                    <div className="page-content">
                      <Switch location={location}>
                        <Route
                          exact
                          path={`${ADMIN_PREFIX}`}
                          render={() => (
                            <Redirect to={`${ADMIN_PREFIX}/pages/posts`} />
                          )}
                        />
                        <Route
                          exact
                          path={`${ADMIN_PREFIX}/pages`}
                          render={() => (
                            <Redirect to={`${ADMIN_PREFIX}/pages/posts`} />
                          )}
                        />
                        <Route
                          exact
                          path={`${ADMIN_PREFIX}/pages/:collection_name/:splat*/*.*`}
                          component={DocumentEdit}
                        />
                        <Route
                          exact
                          path={`${ADMIN_PREFIX}/pages/:collection_name/:splat*/new`}
                          component={DocumentNew}
                        />
                        <Route
                          path={`${ADMIN_PREFIX}/pages/:collection_name/:splat*`}
                          component={Documents}
                        />
                        <Route component={NotFound} />
                      </Switch>
                    </div>
                  </div>
                </CSSTransition>
              </TransitionGroup>
            );
          }}
        />
      </div>
    );
  }
}

Routes.propTypes = {
  location: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
};

export default withRouter(Routes);
