require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { login, createUser } = require('./controllers/users');

const auth = require('./middlewares/auth');
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

app.use('/', express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', auth, usersRoutes);
app.use('/movies', auth, moviesRoutes);

app.listen(PORT);