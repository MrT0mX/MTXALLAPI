const mongoose = require("mongoose");
const { dbURI } = require("../library/settings");

async function connectMongoDb() {
  await mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    /**useCreateIndex: true,
		useFindAndModify: true**/
  });
  const db = await mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("[FXC7] Connect to DB success!");
  });
}

module.exports.connectMongoDb = connectMongoDb;
