const {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

// --------- ALL READ OPERATIONS ---------

async function httpGetAllLaunches(_, res) {
  return res.status(200).json(await getAllLaunches());
}

// --------- ALL CREATE OPERATIONS ---------

async function httpAddNewLaunch(req, res) {
  const newLaunch = req.body;

  if (
    !newLaunch.mission ||
    !newLaunch.rocket ||
    !newLaunch.launchDate ||
    !newLaunch.target
  ) {
    return res.status(400).json({ error: "Missing Required Launch Protperty" });
  }

  newLaunch.launchDate = new Date(newLaunch.launchDate);

  if (isNaN(newLaunch.launchDate)) {
    return res.status(400).json({ error: "Invalid Launch Date" });
  }

  await scheduleNewLaunch(newLaunch);
  return res.status(201).json(newLaunch);
}

// --------- ALL DELETE OPERATIONS ---------

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  const existsLaunch = await existsLaunchWithId(launchId);

  if (!existsLaunch) {
    return res.status(404).json({ error: "Launch Not Found" });
  }

  const aborted = await abortLaunchById(launchId);
  if (!aborted) {
    return res.status(400).json({ error: "Bad Request" });
  }
  return res.status(200).json({
    ok: true,
  });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
