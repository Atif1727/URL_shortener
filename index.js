import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import urlsRouter from './routes/urls.js';
import indexRouter from './routes/index.js';
const app=express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config();

app.use('/', indexRouter);
app.use('/api', urlsRouter);

// SETUP PORT CONSTANTS
const port=process.env.PORT;

// MONGOOSE SETUP
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(port,()=> console.log(`server listening on ${port}`));
}).catch((err)=> console.log(`${err} did not connect to server`)); 

