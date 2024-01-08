const {
  getAllPlanets,
  addPlanetWithImage,
  getPlanetByName,
} = require("../../models/planets.model");

async function httpGetAllPlanets(_, res) {
  return res.status(200).json(await getAllPlanets());
}

// module.exports = {
//   httpGetAllPlanets,
// };

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); // Configures multer to store files in memory

function encodeImageToBase64(file) {
  return Buffer.from(file.buffer).toString("base64");
}

async function httpAddPlanet(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided." });
    }

    const { keplerName } = req.body;
    const imageBase64 = encodeImageToBase64(req.file);

    await addPlanetWithImage(keplerName, imageBase64);
    return res
      .status(201)
      .json({ message: `Planet ${keplerName} added successfully.` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function httpGetPlanetByName(req, res) {
  try {
    const keplerName = req.params.keplerName;
    const planet = await getPlanetByName(keplerName);

    if (!planet) {
      return res.status(404).json({ error: "Planet not found" });
    }

    return res.status(200).json(planet);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = {
  httpGetAllPlanets,
  httpAddPlanet,
  httpGetPlanetByName,
};
