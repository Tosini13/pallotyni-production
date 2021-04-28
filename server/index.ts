import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import router from "./src/routes";
import path from "path";
import { initNodeGallery } from "./src/controllers/images";

require("dotenv").config();

initNodeGallery();

const app = express();

console.log("process.env.MONGO_DB_DATABASE", process.env.MONGO_DB_DATABASE);

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.szdk8.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

mongoose.Promise = global.Promise;

// MIDDLEWARE

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header({
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  next();
});

const CLIENT_BUILD = "../../client/build";
const CLIENT_DEV = "../client/build";

app.use(express.static(path.resolve(__dirname, CLIENT_BUILD))); // ../../client/build

app.use("/gallery", express.static("gallery"));

app.use("/api", router);

app.use("/api", router);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, CLIENT_BUILD, "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `⚡️[server]: Server is running now at https://localhost:${PORT}`
  );
});
