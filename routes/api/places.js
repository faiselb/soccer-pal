const express = require('express');
const axios = require('axios');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const key = require('../../config/keys');

const Place = require('../../models/Place');

module.exports = router;