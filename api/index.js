const dotenv = require("dotenv");
dotenv.config();

const cors = require("./config/cors.config")
const express = require("express");
const app = express();
app.use(cors)
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const userRoute = require("./routes/users.route")
const authRoute = require("./routes/auth.route")
const postRoute = require("./routes/posts.route")
const multer = require("multer")


const mongodbUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/facehack"

mongoose.connect(mongodbUri)
.then(() => console.info(`Succesfully connected to the database ${mongodbUri}`))
.catch(error => console.error(`An error trying to connect to the database ${mongodbUri}`))

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(3000, () => {
  console.log("Backend server is running!");
});