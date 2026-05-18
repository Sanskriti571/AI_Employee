const express = require("express");

const router = express.Router();

const {
  getRecommendation,
  getAllEmployeeRecommendations
} = require("../controllers/aiController");

router.post("/recommend", getRecommendation);

router.post(
  "/recommend-all",
  getAllEmployeeRecommendations
);

module.exports = router;