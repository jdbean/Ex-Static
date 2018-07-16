import { BadInputError } from './apiErrors';
import { toastr } from 'react-redux-toastr';

const getErrorMessage = () => 'Error';
const getSuccessMessage = () => 'Success';

const getFetchErrorMessage = filename => `Could not fetch the ${filename}`;
const getFetchSuccessMessage = filename => `Fetched the ${filename}`;

const getUpdateErrorMessage = filename => `Could not update the ${filename}`;
const getUpdateSuccessMessage = filename => `Updated the ${filename}`;

const getDeleteMessage = filename =>
  `Are you sure that you want to delete "${filename}" ?`;

const getDeleteErrorMessage = filename => `Could not delete the ${filename}`;
const getDeleteSuccessMessage = filename => `Deleted the ${filename}`;

/**
 * Fetch wrapper for GET request that dispatches actions according to the
 * request status
 * @param {String} url
 * @param {Object} action_success
 * @param {Object} action_failure
 * @return {Function} dispatch
 */
export const get = (url, action_success, action_failure, dispatch) => {
  return fetch(url, { credentials: 'same-origin', mode: 'cors' })
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: action_success.type,
        [action_success.name]: data,
      })
    )
    .catch(error => {
      dispatch({
        type: action_failure.type,
        [action_failure.name]: error,
      });
      toastr.error(
        getErrorMessage(),
        getFetchErrorMessage(action_success.name)
      );
    });
};

/**
 * Fetch wrapper for PUT request that dispatches actions according to the
 * request status
 * @param {String} url
 * @param {Object} body
 * @param {Object} action_success
 * @param {Object} action_failure
 * @return {Function} dispatch
 */
export const put = (url, body, action_success, action_failure, dispatch) => {
  return fetch(url, {
    method: 'PUT',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-cache',
    },
    body,
  })
    .then(res => res.json())
    .then(data => {
      if (data.error_message) {
        throw new BadInputError(data.error_message);
      }
      toastr.success(
        getSuccessMessage(),
        getUpdateSuccessMessage(action_success.name)
      );
      dispatch({
        type: action_success.type,
        [action_success.name]: data,
      });
    })
    .catch(error => {
      dispatch({
        type: action_failure.type,
        [action_failure.name]: error,
      });
      let error_message =
        error.name === 'BadInputError'
          ? error.message
          : getUpdateErrorMessage(action_success.name);
      toastr.error(getErrorMessage(), error_message);
    });
};

/**
 * Fetch wrapper for DELETE request that dispatches actions according to the
 * request status
 * @param {String} url
 * @param {Object} action_success
 * @param {Object} action_failure
 * @return {Function} dispatch
 */
export const del = (
  url,
  action_success,
  action_failure,
  dispatch,
  collection,
  directory
) => {
  return fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    credentials: 'same-origin',
  })
    .then(data => {
      dispatch({
        type: action_success.type,
      });
      toastr.success(
        getSuccessMessage(),
        getDeleteSuccessMessage(action_success.name)
      );
    })
    .catch(error => {
      dispatch({
        type: action_failure.type,
      });
      toastr.error(
        getErrorMessage(),
        getDeleteErrorMessage(action_success.name)
      );
    });
};
