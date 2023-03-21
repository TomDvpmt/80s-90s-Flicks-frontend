const express = require("express");
const router = express.Router();
const reviewCtrl = require("../controllers/reviewCtrl");

router.get("/", reviewCtrl.getAllReviews);
router.get("/:id", reviewCtrl.getOneReview);
router.post("/", reviewCtrl.createReview);
router.put("/:id", reviewCtrl.updateReview);
router.delete("/:id", reviewCtrl.deleteReview);

module.exports = router;