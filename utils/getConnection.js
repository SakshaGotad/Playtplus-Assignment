const mongoose = require('mongoose');


const getConnection =()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then((connection)=>{
        console.log("database connection successful");
    }).catch((error)=>{
        console.log(error.message);
    })
}

module.exports = getConnection;