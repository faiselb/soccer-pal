const express = require('express');
const router = express.Router();

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');

module.exports = router;