const { Router } = require('express');
const Label = require('../models/Label');

module.exports = Router()
  .post('/', (req, res, next) => {
    Label
      .create(req.body)
      .then(label => res.send(label))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    const { page = 1, perPage = 25 } = req.query;
    Label
      .find()
      .select({ _id: true, name: true })
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(labels => {
        res.send(labels);
      })
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Label
      .findById(req.params.id)
      .populate('records')
      .then(label => {
        res.send(label);})
      .catch(next);
  })
  .get('/name/:name', (req, res, next) => {
    Label
      .findByName(req.params.name)
      .populate('records')
      .then(label => res.send(label))
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

