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

exports.auth_signin_get =  (req, res) => {
    res.render("auth/signin");
  }

exports.auth_signin_post = async (req, res) => {
  
    let { emailAddress, password} = req.body
  
    try{
      let user = await User.findOne({ emailAddress });
      console.log(user);
  
      if(!user)
      {
        return res.json({ "message": "User Not Found!!!"}).status(400);
      }
  
      const isMatch = await bcrypt.compareSync(password, user.password);
  
      if(!isMatch){
        return res.json({ "message": "Password mismatched!!!"}).status(400);
      }
  
      const payload = {
        user:{
          id: user._id,
          name: user.firstName
        }
      };
  
      jwt.sign(
        payload,
        process.env.secret,
        { expiresIn: 36000000},
        (err, token) => {
          if(err) throw err;
          res.json({ token }).status(200);
        }
      )
  
    } 
    catch (error){
      res.json({"message": "Your are not logged in!!!"}).status(400);
    }
  
  }

  exports.auth_logout_get = (req, res) => {
    
    req.logout();
    req.flash("success", "Your are successfully logged out");
    res.redirect("/auth/signin");
  }