const Card = require("../models/card");

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const OK = 200;

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(OK).send(cards);
    })
    .catch(() => {
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "На сервере произошла ошибка" });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(OK).send(card);
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

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      res.status(NOT_FOUND).send({ message: "Запрашиваемый объект не найден" });
    })
    .then((card) => {
      res.status(OK).send(card);
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

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .orFail(() => {
      res.status(NOT_FOUND).send({ message: "Запрашиваемый объект не найден" });
    })
    .then((card) => {
      res.status(OK).send(card);
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

const deleteCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .orFail(() => {
      res.status(NOT_FOUND).send({ message: "Запрашиваемый объект не найден" });
    })
    .then((card) => {
      res.status(OK).send(card);
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
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteCardLike,
};
