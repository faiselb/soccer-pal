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



module.exports = router;