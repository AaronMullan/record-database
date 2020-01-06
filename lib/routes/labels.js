const { Router } = require('express');
const Label = require('../models/Label');

module.exports = Router()
  .post('/', (req, res, next) => {
    Label
      .create(req.body)
      .then(label => res.send(label))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Label
      .findById(req.params.id)
      .then(label => res.send(label))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    const { page = 1, perPage = 25 } = req.query;
    Label
      .find()
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(labels => {
        res.send(labels);
      })
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Label
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(label => res.send(label))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Label
      .findByIdAndDelete(req.params.id)
      .then(label => res.send(label))
      .catch(next);
  });