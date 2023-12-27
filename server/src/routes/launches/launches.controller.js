const { getAllLaunches, addNewLaunch } = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(Array.from(getAllLaunches()));
}

function httpAddNewLaunch(req, res) {
  const newLaunch = req.body;

  if (
    !newLaunch.mission ||
    !newLaunch.rocket ||
    !newLaunch.launchDate ||
    !newLaunch.destination
  ) {
    return res.status(400).json({ error: "Missing Required Launch Protperty" });
  }

  newLaunch.launchDate = new Date(newLaunch.launchDate);

  if (isNaN(newLaunch.launchDate)) {
    return res.status(400).json({ error: "Invalid Launch Date" });
  }

  addNewLaunch(newLaunch);
  return res.status(201).json(newLaunch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};
