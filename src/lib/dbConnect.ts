import mongoose from "mongoose";

export async function connectToDB() {
  try {
    mongoose.connect(process.env.MONGODB_URI!);

    const db = mongoose.connection;

    db.on('connected', () => {
      console.log("Connected to database");
    });

    db.on('error', (error) => {
      console.error("Error connecting to database: ", error);
      process.exit();
    });

  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
}