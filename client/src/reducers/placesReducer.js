import {
    GET_PLACES,
    PLACES_LOADING,
    GET_SAVED_PLACES,
    DELETE_PLACE
  } from '../actions/types';
  
  const initialState = {
    places: [],
    savedPlaces: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case PLACES_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_PLACES:
        return {
          ...state,
          places: action.payload,
          loading: false
        };
      case GET_SAVED_PLACES:
        return {
          ...state,
          savedPlaces: action.payload,
          loading: false
        };
      case DELETE_PLACE:
        return {
          ...state,
          savedPlaces: state.savedPlaces.filter((place)=> action.payload !== place._id)
        }
      default:
        return state;
    }
  }