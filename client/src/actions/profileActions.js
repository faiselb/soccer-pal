import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_MEETUPS,
  UPDATE_MEETUP,
  DELETE_MEETUP
} from './types';


export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const getCurrentMeetups = () => dispatch => {
  axios
  .get('/api/meetups/current')
  .then(res =>
    dispatch({
      type: GET_MEETUPS,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: GET_MEETUPS,
      payload: []
    })
  );
};


export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

export const getMeetupsByHandle = handle => dispatch => {
  axios
    .get(`/api/meetups/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_MEETUPS,
        payload: res.data
      })
    )
    .catch(err =>
      console.log("there was an error")
    );
};

export const joinMeetupById = meetupId => dispatch => {
  axios
  .post(`/api/meetups/${meetupId}/join`)
  .then(res =>
    dispatch({
      type: UPDATE_MEETUP,
      payload: res.data
    })
  )
  .catch(err =>
    console.log("there was an error")
  ); 
}

export const leaveMeetupById = meetupId => dispatch => {
  axios
  .post(`/api/meetups/${meetupId}/leave`)
  .then(res =>
    dispatch({
      type: UPDATE_MEETUP,
      payload: res.data
    })
  )
  .catch(err =>
    console.log("there was an error")
  ); 
}


export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/myaccount'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


export const addCreatedmeetup = (cmeetupData, history) => dispatch => {
  axios
    .post('/api/meetups/', cmeetupData)
    .then(res => history.push('/myaccount'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};



export const deleteCreatedmeetup = id => dispatch => {
  axios
    .delete(`/api/meetups/${id}`)
    .then(res => 
      dispatch({
        type: DELETE_MEETUP,
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




export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};


export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};


export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};


export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};