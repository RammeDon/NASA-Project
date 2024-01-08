const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const planets = require("./planets.mongo");

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

// function loadPlanets() {
//   return new Promise((resolve, reject) => {
//     fs.createReadStream(
//       path.join(__dirname, "..", "..", "data", "kepler_data.csv")
//     )
//       .pipe(
//         parse({
//           comment: "#",
//           columns: true,
//         })
//       )
//       .on("data", async (data) => {
//         if (isHabitablePlanet(data)) {
//           // habitablePlanets.push(data);
//           savePlanet(data);
//         }
//       })
//       .on("error", (err) => {
//         console.log(err);
//         reject(err);
//       })
//       .on("end", async () => {
//         const countPlanetsFound = (await getAllPlanets()).length;
//         console.log(`${countPlanetsFound} habitable planets found!`);
//       });
//     resolve();
//   });
// }

async function getAllPlanets() {
  return await planets.find({}, { _id: 0, __v: 0 });
}

// async function savePlanet(planet) {
//   try {
//     await planets.updateOne(
//       {
//         keplerName: planet.kepler_name,
//       },
//       {
//         keplerName: planet.kepler_name,
//       },
//       {
//         upsert: true,
//       }
//     );
//   } catch (err) {
//     console.error("Could not add planet: " + err);
//   }
// }

async function addPlanetWithImage(planetName, imageBase64) {
  try {
    const planetData = {
      keplerName: planetName,
      image: imageBase64, // Store the base64-encoded image
    };

    await planets.updateOne({ keplerName: planetName }, planetData, {
      upsert: true,
    });

    console.log(`Planet ${planetName} added with an image.`);
  } catch (err) {
    console.error("Could not add planet with image: " + err);
  }
}

async function getPlanetByName(keplerName) {
  try {
    return await planets.findOne({ keplerName: keplerName });
  } catch (err) {
    console.error("Error getting planet: " + err);
    throw err;
  }
}

module.exports = {
  // loadPlanets,
  getAllPlanets,
  // savePlanet,
  addPlanetWithImage,
  getPlanetByName,
};
