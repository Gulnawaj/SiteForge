import dns from "dns";
import mongoose from "mongoose";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

export const connectDB = async () => {
    mongoose.connect("mongodb+srv://gulnawaj001646_db_user:SHORABALI@cluster0.rle6trz.mongodb.net/AI")
        .then(() => {
            console.log("DB CONNECTED");
        });
};