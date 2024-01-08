// const express = require("express");

// const { httpGetAllPlanets } = require("./planets.controller");

// const planetRouter = express.Router();

// planetRouter.get("/", httpGetAllPlanets);

// module.exports = planetRouter;

const express = require("express");
const {
  httpGetAllPlanets,
  httpAddPlanet,
  httpGetPlanetByName,
} = require("./planets.controller");
const multer = require("multer");

const planetRouter = express.Router();

planetRouter.get("/", httpGetAllPlanets);
const upload = multer({ storage: multer.memoryStorage() });
planetRouter.post("/", upload.single("image"), httpAddPlanet);
planetRouter.get("/:keplerName", httpGetPlanetByName);

module.exports = planetRouter;
