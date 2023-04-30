const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { loginValidation, userValidation } = require('./middlewares/validation');
const handelErrors = require('./middlewares/handelErrors');
const routes = require('./routes/index');
const { PORT, DATABASE } = require('./utils/config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/signin', loginValidation, login);
app.post('/signup', userValidation, createUser);

app.use(auth);
app.use(routes);
app.use(errors());
app.use(handelErrors);

app.listen(PORT);

mongoose.connect(DATABASE, {
  useNewUrlParser: true,
});
