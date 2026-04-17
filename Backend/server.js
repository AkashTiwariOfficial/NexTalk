import "dotenv/config";
import express from "express";
import  app  from "./app.js";
import  connectToMongoDb  from "./db/index.js"


const PORT = process.env.PORT;

connectToMongoDb()
    .then(() => {
        app.listen(PORT, () => {
        console.log(`NexTalk running on port ${PORT}`)
        })
    }).catch((error) => {
        console.log("MongoDb connection failed!", error)
    }
    );
