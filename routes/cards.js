const cardRouter = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteCardLike,
} = require('../controllers/cards');
const { idValidation, cardValidation } = require('../middlewares/validation');

cardRouter.get('/', getCards);
cardRouter.post('/', cardValidation, createCard);
cardRouter.delete('/:cardId', idValidation, deleteCard);
cardRouter.put('/:cardId/likes', idValidation, likeCard);
cardRouter.delete('/:cardId/likes', idValidation, deleteCardLike);

module.exports = cardRouter;
