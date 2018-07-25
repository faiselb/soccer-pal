const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()

const passport = require('passport');

const users = require('./routes/api/users');

const profile = require('./routes/api/profile');
const updates = require('./routes/api/updates');
const places = require('./routes/api/places');
const meetups = require('./routes/api/meetups');

const app = express();

app.use(express.static(__dirname + '/client/build/'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html')
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

require('./config/passport')(passport);

const db = require('./config/keys').mongoURI;

mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


app.use('/api/users', users);

app.use('/api/profile', profile);
app.use('/api/updates', updates);
app.use('/api/places', places);
app.use('/api/meetups', meetups);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
