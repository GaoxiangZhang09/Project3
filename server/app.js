//////////////////////
// SERVER
//////////////////////
import bodyParser from "body-parser";
import express from "express";
import router from "./router/router.js";
// import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// things to parse http request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// use cors to recieve front-end http request
// app.use(cors());

// use frontend as static file, and load index.html inside
app.use(express.static("./frontend"));

// connect to router once arrived root
app.use("/", router);

app.listen(process.env.PORT || 3001, () => {
  console.log("you are connected");
});
