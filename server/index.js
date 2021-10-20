const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());
const db = require("./models");

//Routers
const userRouter = require("./routes/UserRoute");
app.use("/users", userRouter);
const postRouter = require("./routes/PostRoute");
app.use("/posts", postRouter);

const commentRouter = require("./routes/CommentRoute");
app.use("/comments", commentRouter);

db.sequelize.sync().then(() => {
  //Start the server after go through all the models
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
