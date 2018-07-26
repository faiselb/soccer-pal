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

router.post(
    '/',
    (req, res) => {
        const savedPlace = new Place({
            type: req.body.type,
            website: req.body.website,
            rating: req.body.rating,
            img:  req.body.img,
            name:  req.body.name
        });
        savedPlace.save().then(place => res.json(place));
    }
);

router.delete(
    '/:id',
    (req, res) => {
        Place.findOneAndRemove({ _id: req.params.id }).then((removedPlace) => {
            res.json(removedPlace);
        }).catch(err => res.status(422).json(err));
    }
);

module.exports = router;