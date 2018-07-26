const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Update = require('../../models/Update');
const Profile = require('../../models/Profile');

const validateUpdateInput = require('../../validation/update');

router.get('/', (req, res) => {
    Update.find()
        .sort({ date: -1 })
        .then(updates => res.json(updates))
        .catch(err => res.status(404).json({ noupdatesfound: 'No updates found' }));
});

router.get('/:id', (req, res) => {
    Update.findById(req.params.id)
        .then(update => res.json(update))
        .catch(err =>
            res.status(404).json({ noupdatefound: 'No update found with that ID' })
        );
});



module.exports = router;