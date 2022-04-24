const User = require('../models/User');
const bcrypt = require('bcrypt');
let passport = require('../helper/ppConfig');
const salt = 10;
const {validationResult} = require('express-validator');
const jwt = require("jsonwebtoken");


exports.auth_signup_get = (req, res) => {
    res.render("auth/signup");
}

exports.auth_signup_post = (req, res) => {
    let user = new User(req.body);
    console.log(req.body);
    let hash = bcrypt.hashSync(req.body.password, salt);
    console.log(hash);

    user.password = hash;

    user.save()
    .then(() => {
        res.json({"message": "User Created Successfully!!!"})
    })
    .catch((err) => {

        if(err.code == 11000){
            res.json({"message": "Email Already Exists"})
        }
        else
        {
          const errors = validationResult(req);
          if(!errors.isEmpty()){
            res.json({"message": "Validation Errors", "ValidationErrors": errors.errors})
          }
          res.json({"message": "Error Creating User. Please try again later."})

        }

    })
}