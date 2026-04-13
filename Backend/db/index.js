import mongoose from "mongoose";
import { dataBase_Name }  from "../constants.js"

const connectToMongoDb = async () => {
    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${dataBase_Name}`);
        console.log(`MongoDb connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDb connection failed!", error);
        process.exit(1);
    }
}

export default connectToMongoDb