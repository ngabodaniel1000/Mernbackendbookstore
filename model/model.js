const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    username:{
        type: String, required: true, unique: true 
    },
    password:{
        type: String, required: true
    },
    email: { 
        type: String, required: true, unique: true
     },
});

const model = new mongoose.model("users",Schema);

module.exports = model;