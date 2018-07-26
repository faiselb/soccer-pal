const express = require('express');
const axios = require('axios');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const key = require('../../config/keys');

const Place = require('../../models/Place');

router.get('/', (req, res) => {
    Place.find()
        .then(places => res.json(places))
        .catch(err => res.status(404).json({ noplacesfound: 'No places found' }));
});

module.exports = router;