
// Middleware for user to check.
// module.exports = (req, res, next) => {
//     if(!req.user)
//     {
//         res.redirect("/auth/signin")
//     }
//     else{
//         next();
//     }
// }

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {

    // Token from header
    // const token = req.header("x-auth-token")
    // console.log(token);

    // Token from Authorization Header
    var authorizationToken = req.header("Authorization");
    console.log(authorizationToken);
    authorizationToken = authorizationToken.replace("Bearer ", "")
    console.log(authorizationToken);
    const token = authorizationToken;

    if(!token) {
        return res.json({
            "message": "Aha!!! You are not allowed to view this !!!"
        }).status(401)
    }

    try{
        const decoded = jwt.verify(token, process.env.secret);
        req.user = decoded.user;
        next();
    }
    catch(error){
        return res.json({"message": "Your token is invalid"});
    }

}