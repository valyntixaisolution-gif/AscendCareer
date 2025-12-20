import mongoose from "mongoose";

async function connectToDatabase() {
    try {

        mongoose.connection.on(() => {
            console.log("Database Connected Successfully");
        });

        mongoose.connection.on((error) => {
            console.log("Error Connecting to the database");
        })

        await mongoose.connect(database);
    } catch (error) {
        console.log("Database connection error", error);
    }
};

export default connectToDatabase;