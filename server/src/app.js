const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const planetRouter = require("./routes/planets/planets.router");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(morgan("combined"));

app.use(express.json());
// This is to show the react app
app.use(express.static(path.join(__dirname, "..", "public")));

// This is to make sure that when the domain alone is called it defaults to the index.html file
// In the production build
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use("", planetRouter);

module.exports = app;
