const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCreatedmeetupInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.date = !isEmpty(data.date) ? data.date : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Meetup title field is required';
  }

  if (Validator.isEmpty(data.date)) {
    errors.date = 'Meetup date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};