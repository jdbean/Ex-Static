import { getConfigurationUrl } from '../constants/api';
import { get } from '../utils/fetch';

// Action Types
export const FETCH_CONFIG_REQUEST = 'FETCH_CONFIG_REQUEST';
export const FETCH_CONFIG_SUCCESS = 'FETCH_CONFIG_SUCCESS';
export const FETCH_CONFIG_FAILURE = 'FETCH_CONFIG_FAILURE';

// Actions
export const fetchConfig = () => dispatch => {
  dispatch({ type: FETCH_CONFIG_REQUEST });
  return get(
    getConfigurationUrl(),
    { type: FETCH_CONFIG_SUCCESS, name: 'config' },
    { type: FETCH_CONFIG_FAILURE, name: 'error' },
    dispatch
  );
};

// Reducer
export default function config(
  state = {
    config: {},
    isFetching: false,
  },
  action
) {
  switch (action.type) {
    case FETCH_CONFIG_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_CONFIG_SUCCESS:
      return {
        ...state,
        config: action.config,
        isFetching: false,
      };
    case FETCH_CONFIG_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return {
        ...state,
      };
  }
}
