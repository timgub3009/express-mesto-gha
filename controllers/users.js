const User = require("../models/user");

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const OK = 200;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(OK).send(users);
    })
    .catch(() => {
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "На сервере произошла ошибка" });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      res.status(NOT_FOUND).send({ message: "Запрашиваемый объект не найден" });
    })
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "На сервере произошла ошибка" });
      } else err.name === "ValidationError";
      {
        res
          .status(BAD_REQUEST)
          .send({ message: "Переданы некорректные данные" });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "На сервере произошла ошибка" });
      } else err.name === "ValidationError";
      {
        res
          .status(BAD_REQUEST)
          .send({ message: "Переданы некорректные данные" });
      }
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .orFail(() => {
      res.status(NOT_FOUND).send({ message: "Запрашиваемый объект не найден" });
    })
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch(() => {
      if (err.name === "CastError") {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "На сервере произошла ошибка" });
      } else err.name === "ValidationError";
      {
        res
          .status(BAD_REQUEST)
          .send({ message: "Переданы некорректные данные" });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, avatar)
    .orFail(() => {
      res.status(NOT_FOUND).send({ message: "Запрашиваемый объект не найден" });
    })
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch(() => {
      if (err.name === "CastError") {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "На сервере произошла ошибка" });
      } else err.name === "ValidationError";
      {
        res
          .status(BAD_REQUEST)
          .send({ message: "Переданы некорректные данные" });
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
