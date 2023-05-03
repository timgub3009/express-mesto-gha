const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { OK } = require('../utils/config');
const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate('owner'))
    .then((card) => {
      res.status(OK).send({ data: card });
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый объект не найден');
    })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.deleteOne()
          .then(() => {
            res.send({ data: card });
          });
      } else {
        throw new ForbiddenError('Нет доступа');
      }
    })
    .catch(next);
};

const handleLikes = (req, res, data, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, data, { new: true })
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый объект не найден');
    })
    .populate(['owner', 'likes'])
    .then((likes) => {
      res.send({ data: likes });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const data = { $addToSet: { likes: req.user._id } };
  handleLikes(req, res, data, next);
};

const deleteCardLike = (req, res, next) => {
  const data = { $pull: { likes: req.user._id } };
  handleLikes(req, res, data, next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteCardLike,
};
