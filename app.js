require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { login, createUser } = require('./controllers/users');

const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', usersRoutes);
app.use('/movies', moviesRoutes);

app.listen(PORT);