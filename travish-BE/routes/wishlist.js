const express = require('express');
const router = express.Router();
const wishListCntrl = require('../controllers/wishlist');

router.get("/wishList/add", isLoggedIn, wishListCntrl.wishList_create_get);
router.post("/wishList/add", wishListCntrl.wishList_create_post);
router.get("/wishList/index", isLoggedIn,  wishListCntrl.wishList_index_get);
router.get("/wishList/detail", wishListCntrl.wishList_show_get);
router.delete("/wishList/delete", wishListCntrl.wishList_delete_get);
router.get("/wishList/edit", wishListCntrl.wishList_edit_get);
router.put("/wishList/update", wishListCntrl.wishList_update_put);


module.exports = router;