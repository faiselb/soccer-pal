import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_MEETUPS,
    UPDATE_MEETUP,
    DELETE_MEETUP
  } from '../actions/types';
  
  const initialState = {
    profile: null,
    profiles: null,
    meetups: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case PROFILE_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_PROFILE:
        return {
          ...state,
          profile: action.payload,
          loading: false
        };
      case GET_PROFILES:
        return {
          ...state,
          profiles: action.payload,
          loading: false
        };
      case GET_MEETUPS:
        return {
          ...state,
          meetups: action.payload
        }
      case UPDATE_MEETUP:
        const updatedMeetups = state.meetups.map((meetup)=> {
          if(action.payload._id === meetup._id){
            return action.payload;
          }
          else {
            return meetup;
          }
        });
        return {
          ...state,
          meetups: updatedMeetups
        }
      case DELETE_MEETUP:
        return {
          ...state,
          meetups: state.meetups.filter((meetup)=> action.payload._id !== meetup._id)
        }
      case CLEAR_CURRENT_PROFILE:
        return {
          ...state,
          profile: null
        };
      default:
        return state;
    }
  }
  