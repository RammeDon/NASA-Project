const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");

const { loadPlanets } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://nasa-api:rtwaXjSqZJbNOtCN@nasacluster.3omad0l.mongodb.net/nasa?retryWrites=true&w=majority";

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB Connection is ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  // await loadPlanets();

  server.listen(PORT, () => {
    console.log(`listening on Port: ${PORT}...`);
  });
}

startServer();
