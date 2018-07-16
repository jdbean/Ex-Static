/* eslint-disable import/default */
import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { configureStore, history } from '../store';
import { ADMIN_PREFIX } from '../constants';
import Main from '../containers/Main';
import ReduxToastr from 'react-redux-toastr';
import { hot, AppContainer } from 'react-hot-loader';

const store = configureStore();

const App = () => (
  <AppContainer>
    <Provider store={store}>
      <div>
        <ConnectedRouter history={history}>
          <Route path={`${ADMIN_PREFIX}`} component={Main} />
        </ConnectedRouter>
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="bottom-right"
          transitionIn="bounceIn"
          transitionOut="bounceOut"
          progressBar
        />
      </div>
    </Provider>
  </AppContainer>
);

export default hot(module)(App);
