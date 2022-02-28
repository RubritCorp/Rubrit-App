//from modules
import mongoose, { ConnectOptions } from "mongoose";


/* const MONGO_URI: string = `${process.env.MONGO_URI}`;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
} as ConnectOptions;

let cached = global.mongoose;

if (!process.env.MONGO_URI) {
  throw new Error("Please add your MONGO URI to .env.local");
}

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  console.info("Mongoose conectado correcamente 🚀");
  return cached.conn;
}; */


import envConfig from "../../next-env-config";


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
      console.log(`MongoDB connected successfully at: ${db.connection.name}`);
    } catch (err) {
      console.log("Error ocurred in DB connection");
    }
  })();
} else {
  console.log("MongoDB was already connected");
}
