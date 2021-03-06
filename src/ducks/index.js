import { combineReducers } from 'redux';
import config from './config';
import collections from './collections';
import metadata from './metadata';
import utils from './utils';
import tour from './tour';
import { reducer as toastrReducer } from 'react-redux-toastr';

export default combineReducers({
  config,
  collections,
  metadata,
  utils,
  tour,
  toastr: toastrReducer,
});
