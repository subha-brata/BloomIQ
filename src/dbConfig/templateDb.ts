import mongoose from "mongoose";

export async function templateConnect() {
    try {
        const MONGO_URL_TEMPLATE = "mongodb+srv://malliksubhabrata:ZKWBbYGHVGYpcUus@cluster0.fz9uenl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

        mongoose.connect(MONGO_URL_TEMPLATE);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log(`template database is connected`);
        });
        connection.on('error', (err) => {
            console.log(`${err} occurred on template connection module`);
            process.exit();
        });
    } catch (error) {
        console.log(`something went wrong! ${error}`);
    }
}
