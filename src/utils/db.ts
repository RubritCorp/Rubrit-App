//from modules
import mongoose, { ConnectOptions } from "mongoose";
import color from "colors";
import envConfig from "../../next-env-config";
color.enable();

const conn: { isConnected: boolean } = {
  isConnected: false,
};

if (!conn.isConnected) {
  (async () => {
    try {
      const db = await mongoose.connect(`${envConfig?.dbConn}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
      console.log(
        `MongoDB connected successfully at: ${db.connection.name}`.red.bold
      );
    } catch (err) {
      console.log("Error ocurred in DB connection");
    }
  })();
} else {
  console.log("MongoDB was already connected".green.bold);
}
