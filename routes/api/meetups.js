const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Meetup = require('../../models/Meetup');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateCreatedmeetupInput = require('../../validation/createdmeetup');



module.exports = router;


