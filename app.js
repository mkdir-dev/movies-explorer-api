const express = require('express');
const mongoose = require('mongoose');

const usersRoutes = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('/users', usersRoutes);

app.listen(PORT);

/*
GET /movies
POST /movies
DELETE /movies/movieId
*/