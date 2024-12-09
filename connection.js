const mongoose = require("mongoose")

async function connectMongoDb(uri){
    await mongoose.connect(uri).then(()=>{
        console.log("MongoDB connected succesfully!");
    }).catch((error)=>{
        console.log("connection failed.",error);
    })
}


module.exports = connectMongoDb
