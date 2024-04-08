// require('dotenv').config({path: './env'})

import connectDB from './db/index.js'
import dotenv from 'dotenv'

dotenv.config({path:'./env'})

connectDB()


















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