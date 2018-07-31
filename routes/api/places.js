const express = require('express');
const axios = require('axios');
const router = express.Router();
const key = require('../../config/keys');

const Place = require('../../models/Place');

router.get('/search', async (req, res) => {
    const APIkey = "&key=" + key.PLACES_KEY;
    types = ['gym', 'bar', 'park'];
    let searchResults = [];
    await Promise.all(types.map(async (typeVal) => {
        const type = "&type=" + typeVal;
        const query = "query=" + req.query.query + type + "&limit=8&rankby=prominence" + APIkey;
        const response = await axios.get("https://maps.googleapis.com/maps/api/place/textsearch/json?" + query);
        await Promise.all(response.data.results.map(async (result, index) => {
            const place_id = result.place_id;
            if (index < 3) {
                const details = await axios.get("https://maps.googleapis.com/maps/api/place/details/json?place_id=" + place_id + APIkey);
                let imgUrl = null;
                if (details.data.result.photos.length > 0) {
                    const photo = details.data.result.photos[0].photo_reference;
                    imgUrl = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=254&maxheight=200&photoreference=" + photo + APIkey;
                }
                const searchResult = {
                    type: typeVal,
                    website: details.data.result.website,
                    rating: details.data.result.rating,
                    img: imgUrl,
                    name: details.data.result.name
                }
                searchResults.push(searchResult);
            }
        }));
    }));

    res.json(searchResults);
});

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
            img: req.body.img,
            name: req.body.name
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