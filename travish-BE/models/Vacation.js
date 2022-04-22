const { accepts } = require("express/lib/request");
const mongoose = require("mongoose"); 

const vacationSchema = mongoose.Schema({
    destination: String,
    flight: String,
    activities: [String],
})

const Vacation = mongoose.model("Vacation", vacationSchema)

module.exports = {Vacation};