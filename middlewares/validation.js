const { celebrate, Joi } = require('celebrate');

// eslint-disable-next-line no-useless-escape
const regex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const profileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const idValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }).unknown(true),
});

const avatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regex),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const cardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(regex),
  }),
});

module.exports = {
  userValidation,
  profileValidation,
  idValidation,
  avatarValidation,
  loginValidation,
  cardValidation,
};
