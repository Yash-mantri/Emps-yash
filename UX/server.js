// const path = require("path");
// require(`dotenv`).config({
//   path: path.join(__dirname, "../views/.env")
// });
const express = require("express");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(6969, "0.0.0.0", () => {
  console.log(`Server is running on http://192.168.0.103:6969`);
});