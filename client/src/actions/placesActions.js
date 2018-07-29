import axios from 'axios';

import {
  GET_PLACES,
  PLACES_LOADING,
  DELETE_PLACE,
  GET_SAVED_PLACES
} from './types';

export const getPlaces = (queryString) => dispatch => {
  dispatch(setPlacesLoading());
  axios
    .get("/api/places/search?query=" + queryString)
    .then(res => {
      dispatch({
        type: GET_PLACES,
        payload: res.data
      });
    })
    .catch(err =>
    	console.log(err)
    );
};


export const setPlacesLoading = () => {
  return {
    type: PLACES_LOADING
  };
};

export const deletePlace = (placeId) => {
  return {
    type: DELETE_PLACE,
    payload: placeId
  };
};

export const deletePlaceAsync = (place) => dispatch => {
  const placeId = place._id;
  axios.delete("/api/places/" + placeId)
  .then(res => {
    dispatch(deletePlace(placeId));
  })
  .catch(err =>
    console.log(err)
  );
}


export const savePlace = (place) => dispatch => {
  axios
  .post("/api/places/", place)
  .then(res => {
    console.log("Successfully saved place")
  })
  .catch(err =>
    console.log(err)
  );
};


export const getSavedPlaces = (place) => dispatch => {
  axios
  .get("/api/places/")
  .then(res => {
    dispatch({
      type: GET_SAVED_PLACES,
      payload: res.data
    });
  })
  .catch(err =>
    console.log(err)
  );
};