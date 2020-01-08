require('dotenv').config();
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const seed = require('./seed');
const Label = require('../models/Label');
const Record = require('../models/Record');
const Artist = require('../models/Artist');
const User = require('../models/User');

beforeAll(() => {
  connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});
