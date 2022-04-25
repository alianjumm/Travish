const WishList = require('../models/WishList');

exports.wishList_create_post = (req, res) => {
    console.log(req.body);

    let wishList = new wishList(req.body);

    // Save wishList
    wishList.save()
    .then((wishList) => {
        // res.redirect("/wishList/index");
        res.json({wishList})
    })
    .catch((err) => {
        console.log(err);
        res.send("error");
    });
};
exports.wishList_index_get = (req, res) => {
    wishList.find()
    .then(wishLists => {
        res.json({wishLists})
    })
    .catch(err => {
        console.log(err);
    });
};