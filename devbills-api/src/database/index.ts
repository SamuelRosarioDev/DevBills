import mongoose from "mongoose";

export async function setupMongo(): Promise<void> {
    try {
        if (mongoose.connection.readyState >= 1) {
            return;
        }

        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGODB_URL as string);
        console.log("Connected to MongoDB");
        
    } catch (error) {
        console.error("MongoDB connection error details:", error);
        throw new Error("Failed to connect to MongoDB");
    }
}
