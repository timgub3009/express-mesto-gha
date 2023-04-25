const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  BAD_REQUEST,
} = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch(() => {
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      res.status(NOT_FOUND).send({ message: 'Запрашиваемый объект не найден' });
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => User.create({
    name,
    about,
    avatar,
    email,
    password: hash,
  }))
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      res.status(NOT_FOUND).send({ message: 'Запрашиваемый объект не найден' });
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      res.status(NOT_FOUND).send({ message: 'Запрашиваемый объект не найден' });
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({ message: 'Аутентификация успешна!' });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  getCurrentUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};
