// require('dotenv').config({path: './env'})

import connectDB from './db/index.js';
import dotenv from 'dotenv';
import { app } from './app.js';

dotenv.config({ path: './env' })

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on PORT :: ${process.env.PORT}`);
        })
    })

    .catch((error) => {
        console.log(`MongoDB Connection Failed :: ${error}`);
    })



    app.on('error',(err) => {
        console.log(err);
        throw error;
    })
















/*
import express from "express";
const app = express();
( async () => {
    try {
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on('error',(error) => {
            console.log(`${error}`)
            throw error;
        })

        app.listen(process.env.PORT,() => {
            console.log(`app is listening on port : ${process.evn.PORT}`)

        })


    } catch (error) {
        console.error("Error Occured When Connecting to DB :: " + error)
        throw error;
    }
})()*/