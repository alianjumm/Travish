const { accepts } = require("express/lib/request");
const mongoose = require("mongoose"); 

const wishListSchema = mongoose.Schema({
    name: String,
    description: String,
    visited: Boolean,
    vacation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vacation'
    }], 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: true
})

const WishList = mongoose.model("wishList", wishListSchema)

module.exports = {WishList};