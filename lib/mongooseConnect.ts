import mongoose from "mongoose";

export const mongooseConnect = async () => {
  if (mongoose.connection.readyState === 1) {
    mongoose.connection.asPromise();
  } else {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri);
  }
};
