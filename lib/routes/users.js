const { Router } = require('express');
const Note = require('../models/Note');

module.exports = Router()
  .post('/', (req, res, next) => {
    Note
      .create(req.body)
      .then(note => res.send(note))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Note
      .findById(req.params.id)
      .then(note => res.send(note))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    const { page = 1, perPage = 25 } = req.query;
    Note
      .find()
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(notes => {
        res.send(notes);
      })
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Note
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(note => res.send(note))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Note
      .findByIdAndDelete(req.params.id)
      .then(note => res.send(note))
      .catch(next);
  });
