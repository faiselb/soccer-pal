const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MeetupSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    createdby: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    joinedUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    location: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: false
    },
    description: {
        type: String
    },
});

module.exports = Meetup = mongoose.model('Meetup', MeetupSchema);