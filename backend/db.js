const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.mongoURI ;
const connectToMongo = () =>{
    mongoose.connect(mongoURI).then(()=>{console.log('connected to mongoDB.')}).catch();
}

module.exports = connectToMongo ;
