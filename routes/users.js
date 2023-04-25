const userRouter = require('express').Router();

const {
  getUsers, getUser, getCurrentUser, updateProfile, updateAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);
userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', updateProfile);
userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;
