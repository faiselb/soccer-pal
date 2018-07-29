import axios from 'axios';

import {
  ADD_UPDATE,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_UPDATES,
  GET_UPDATE,
  UPDATE_LOADING,
  DELETE_UPDATE
} from './types';


export const addUpdate = updateData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/updates', updateData)
    .then(res =>
      dispatch({
        type: ADD_UPDATE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


export const getUpdates = () => dispatch => {
  dispatch(setUpdateLoading());
  axios
    .get('/api/updates')
    .then(res =>
      dispatch({
        type: GET_UPDATES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_UPDATES,
        payload: null
      })
    );
};


export const getUpdate = id => dispatch => {
  dispatch(setUpdateLoading());
  axios
    .get(`/api/updates/${id}`)
    .then(res =>
      dispatch({
        type: GET_UPDATE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_UPDATE,
        payload: null
      })
    );
};


export const deleteUpdate = id => dispatch => {
  axios
    .delete(`/api/updates/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_UPDATE,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};



export const addComment = (updateId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/updates/comment/${updateId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_UPDATE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


export const deleteComment = (updateId, commentId) => dispatch => {
  axios
    .delete(`/api/updates/comment/${updateId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_UPDATE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


export const setUpdateLoading = () => {
  return {
    type: UPDATE_LOADING
  };
};


export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};