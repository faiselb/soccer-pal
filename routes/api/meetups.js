const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Meetup = require('../../models/Meetup');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateCreatedmeetupInput = require('../../validation/createdmeetup');

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateCreatedmeetupInput(req.body);

        if (!isValid) {

            return res.status(400).json(errors);
        }
        const meetup = new Meetup({
            title: req.body.title,
            createdby: req.user.id,
            location: req.body.location,
            date: req.body.date,
            time: req.body.time,
            description: req.body.description
        });
        meetup.save().then(meetup => {
            res.json(meetup);
        }).catch(err => res.status(422).json(err));
    }
);

const getIdToNameObj = async () => {
    const users = await User.find();
    let idToNameObj = {};
    users.forEach((user) => {
        idToNameObj[user._id] = user.name;
    });
    return idToNameObj;
}

router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const errors = {};

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (!profile) {
                    errors.noprofile = 'There is no profile for this user';
                    res.status(404).json(errors);
                }
                User.findOne({ _id: profile.user }).then((user) => {
                    Meetup.find({ createdby: profile.user }).then(async (meetups) => {
                        const idToNameObj = await getIdToNameObj();
                        const meetupsWithNameInsteadOfId = meetups.map((meetup) => {
                            return {
                                ...meetup._doc,
                                createdby: user.name,
                                joinedUserNames: meetup._doc.joinedUsers.map((userId) => idToNameObj[userId])
                            };
                        });
                        res.json(meetupsWithNameInsteadOfId);
                    });
                });
            })
            .catch(err => res.status(404).json(err));
    }
);

router.get('/handle/:handle', (req, res) => {
    const errors = {};

    Profile.findOne({ handle: req.params.handle })
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }
            User.findOne({ _id: profile.user }).then((user) => {
                Meetup.find({ createdby: profile.user }).then(async (meetups) => {
                    const idToNameObj = await getIdToNameObj();
                    const meetupsWithNameInsteadOfId = meetups.map((meetup) => {
                        return {
                            ...meetup._doc,
                            createdby: user.name,
                            joinedUserNames: meetup._doc.joinedUsers.map((userId) => idToNameObj[userId])
                        };
                    });
                    res.json(meetupsWithNameInsteadOfId);
                });
            }
            )
        })
        .catch(err => res.status(404).json(err));
});

router.post(
    '/:id/join',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Meetup.findOne({ _id: req.params.id }).then((meetup) => {
            meetup.joinedUsers.unshift(req.user.id);
            meetup.save().then(async (meetup) => {
                const idToNameObj = await getIdToNameObj();
                const meetupWithNames = {
                    ...meetup._doc,
                    createdby: idToNameObj[meetup._doc.createdby],
                    joinedUserNames: meetup._doc.joinedUsers.map((userId) => idToNameObj[userId])
                }
                res.json(meetupWithNames)
            });
        }).catch(err => res.status(422).json(err));
    }
);

router.post(
    '/:id/leave',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Meetup.findOne({ _id: req.params.id }).then((meetup) => {
            const removeIndex = meetup.joinedUsers
                .map(item => item.id)
                .indexOf(req.user.id);
            meetup.joinedUsers.splice(removeIndex, 1);
            meetup.save().then(async (meetup) => {
                const idToNameObj = await getIdToNameObj();
                const meetupWithNames = {
                    ...meetup._doc,
                    createdby: idToNameObj[meetup._doc.createdby],
                    joinedUserNames: meetup._doc.joinedUsers.map((userId) => idToNameObj[userId])
                }
                res.json(meetupWithNames)
            });
        }).catch(err => res.status(422).json(err));
    }
);






module.exports = router;


