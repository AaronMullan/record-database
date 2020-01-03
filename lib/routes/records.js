const { Router } = require('express');
const Record = require('../models/Record');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Record
      .create(req.body)
      .then(record => res.send(record))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Record
      .findById(req.params.id)
      .then(record => res.send(record))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    const { page = 1, perPage = 25 } = req.query;
    Record
      .find()
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(records => {
        res.send(records);
      })
      .catch(next);
  })
  .patch('/:id', ensureAuth, (req, res, next) => {
    Record
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(record => res.send(record))
      .catch(next);
  })
  .delete('/:id', ensureAuth, (req, res, next) => {
    Record
      .findByIdAndDelete(req.params.id)
      .then(record => res.send(record))
      .catch(next);
  });

