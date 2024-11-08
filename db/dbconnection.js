const mongoose = require("mongoose")

const Db = async()=>{
    try {   
       await mongoose.connect(process.env.MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(()=>{
            console.log('MongoDB connected');
        })
    } catch (error) {
        console.log(error);       
    }

}
module.exports = Db;
