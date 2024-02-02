const express = require("express");
const { saveAndUpdateNews, getData } = require("../controllers/news");
const router = express.Router();

router.post('/add-news',saveAndUpdateNews);
router.post('/get-news',getData);

module.exports = router;