import mongoose from "mongoose";
import { startHttpApi } from "./api";

const connectMongoDb = async () => {
    console.log("Connecting to mongodb...");
    await mongoose.connect(
        "mongodb://admin:admin123@localhost:27017/db?authSource=admin",
    );
    console.log("mongodb connected =)");
};

const executeApp = async () => {
    try {
        await connectMongoDb();
        startHttpApi();
    } catch (error) {
        console.log("unable to start application: ", error);
        process.exit(1);
    }
};

executeApp();
