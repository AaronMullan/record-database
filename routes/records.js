const { Router } = require('express');
const Record = require('../lib/models/Record');

module.exports = Router()
  .post('/', (req, res, next) => {
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
  });
