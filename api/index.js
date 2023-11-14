const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")


dotenv.config();

const mongodbUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/facehack"

mongoose.connect(mongodbUri)
.then(() => console.info(`Succesfully connected to the database ${mongodbUri}`))
.catch(error => console.error(`An error trying to connect to the database ${mongodbUri}`))

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(3000, () => {
  console.log("Backend server is running!");
});