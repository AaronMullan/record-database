const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/records', require('./routes/records'));
app.use('/api/v1/labels', require('./routes/labels'));
app.use('/api/v1/artists', require('./routes/artists'));
app.use('/api/v1/notes', require('./routes/notes'));
// app.use('/api/v1/users', require('./routes.users'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
