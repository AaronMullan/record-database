const { Router } = require('express');
const Artist = require('../models/Artist');

module.exports = Router()
  .post('/', (req, res, next) => {
    Artist
      .create(req.body)
      .then(artist => res.send(artist))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Artist
      .findById(req.params.id)
      .populate('records')
      .then(artist => res.send(artist))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    const { page = 1, perPage = 100 } = req.query;
    Artist
      .find()
      .select({ _id:true, name:true, discogsID:true })
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(artists => {
        res.send(artists);
      })
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Artist
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(artist => res.send(artist))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Artist
      .findByIdAndDelete(req.params.id)
      .then(artist => res.send(artist))
      .catch(next);
  });
