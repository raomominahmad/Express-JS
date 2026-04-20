import mongoose from "mongoose";

const connectDB = async (params) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error");
    process.exit(1);
  }
};

export { connectDB };
