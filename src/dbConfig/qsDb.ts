import mongoose from "mongoose";

export async function qsConnect() {
  try {
    const MONGO_URL_USER =
      "mongodb+srv://malliksubhabrata:ZKWBbYGHVGYpcUus@cluster0.fz9uenl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    mongoose.connect(MONGO_URL_USER);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log(`user database is connected`);
    });
    connection.on("error", (err) => {
      console.log(`${err} occured on user connection module`);
      process.exit();
    });
  } catch (error) {
    console.log(`something goes wrong! ${error}`);
  }
}
