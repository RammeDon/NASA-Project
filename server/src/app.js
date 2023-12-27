const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

// Routers
const planetRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(morgan("combined"));

// This allows Express to take JSON requests
app.use(express.json());
// This is to show the react app
app.use(express.static(path.join(__dirname, "..", "public")));

// This is where I'm defining my route roots
app.use("/planets", planetRouter);
app.use("/launches", launchesRouter);

// This is to make sure that when the domain alone is called it defaults to the index.html file
// In the production build
app.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
