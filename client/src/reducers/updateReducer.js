import {
    ADD_UPDATE,
    GET_UPDATES,
    GET_UPDATE,
    DELETE_UPDATE,
    UPDATE_LOADING
  } from '../actions/types';
  
  const initialState = {
    updates: [],
    update: {},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case UPDATE_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_UPDATES:
        return {
          ...state,
          updates: action.payload,
          loading: false
        };
      case GET_UPDATE:
        return {
          ...state,
          update: action.payload,
          loading: false
        };
      case ADD_UPDATE:
        return {
          ...state,
          updates: [action.payload, ...state.updates]
        };
      case DELETE_UPDATE:
        return {
          ...state,
          updates: state.updates.filter(update => update._id !== action.payload)
        };
      default:
        return state;
    }
  }  