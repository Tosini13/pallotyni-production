import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import AWS from "aws-sdk";
import router from "./src/routes";
import path from "path";
import { initNodeGallery } from "./src/controllers/images";

require("dotenv").config();

initNodeGallery();

const app = express();

// ########### CONNECTIONS ############
// -------- MONGODB -------

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.szdk8.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

mongoose.Promise = global.Promise;

// -------- AWS -------

const credentialsAWS = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SERCRET_ACCESS_KEY,
};
export const s3 = new AWS.S3(credentialsAWS);
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

const CLIENT_PATH = process.env.CLIENT_PATH ?? "../../client/build";

app.use(express.static(path.resolve(__dirname, CLIENT_PATH))); // ../../client/build

app.use("/gallery", express.static("gallery"));

app.use("/api", router);

app.use("/api", router);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, CLIENT_PATH, "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `⚡️[server]: Server is running now at https://localhost:${PORT}`
  );
});
