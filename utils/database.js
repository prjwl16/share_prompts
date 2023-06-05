import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("DB already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.DATABASE, {
      dbName: "promptopia",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("DB connected");
  } catch (error) {
    console.log("Error", error);
  }
};
