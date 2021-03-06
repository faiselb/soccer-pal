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

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateUpdateInput(req.body);

        if (!isValid) {

            return res.status(400).json(errors);
        }

        const newUpdate = new Update({
            text: req.body.text,
            name: req.body.name,
            user: req.user.id
        });

        newUpdate.save().then(update => res.json(update));
    }
);

router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Update.findById(req.params.id)
                .then(update => {

                    if (update.user.toString() !== req.user.id) {
                        return res
                            .status(401)
                            .json({ notauthorized: 'User not authorized' });
                    }


                    update.remove().then(() => res.json({ success: true }));
                })
                .catch(err => res.status(404).json({ updatenotfound: 'No update found' }));
        });
    }
);

router.post(
    '/comment/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateUpdateInput(req.body);


        if (!isValid) {

            return res.status(400).json(errors);
        }

        Update.findById(req.params.id)
            .then(update => {
                const newComment = {
                    text: req.body.text,
                    name: req.body.name,
                    user: req.user.id
                };


                update.comments.unshift(newComment);

                update.save().then(update => res.json(update));
            })
            .catch(err => res.status(404).json({ updatenotfound: 'No update found' }));
    }
);

router.delete(
    '/comment/:id/:comment_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Update.findById(req.params.id)
            .then(update => {

                if (
                    update.comments.filter(
                        comment => comment._id.toString() === req.params.comment_id
                    ).length === 0
                ) {
                    return res
                        .status(404)
                        .json({ commentnotexists: 'Comment does not exist' });
                }


                const removeIndex = update.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.comment_id);


                update.comments.splice(removeIndex, 1);

                update.save().then(update => res.json(update));
            })
            .catch(err => res.status(404).json({ updatenotfound: 'No update found' }));
    }
);


module.exports = router;