const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");
const bodyParser = require("body-parser");
const router = require("express").Router();

const NOT_FOUND = 404;

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "643af14f7375b14e54e6b32f", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use("/users", userRouter);
app.use("/cards", cardRouter);
router.use((req, res, next) => {
  res.status(NOT_FOUND).send({ message: "Запрашиваемый ресурс не найден" });
  next();
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
});

