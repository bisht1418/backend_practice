const express = require("express");
const app = express();
const { connectDB } = require("./db");
require("dotenv").config();

const port = process.env.PORT || 8080;
const cors = require("cors");
const { userRouter } = require("./Router/users.router");
const { auth } = require("./Middleware/auth.middleware");
app.use(express.json());

app.use("/users", userRouter);
app.get("/", auth, (req, res) => {
  try {
    res.json({ message: "welcome to practice session" });
  } catch (error) {
    res.json({ error });
  }
});

app.listen(port, async () => {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
  }
  console.log(`Running in the port : ${port}`);
});
