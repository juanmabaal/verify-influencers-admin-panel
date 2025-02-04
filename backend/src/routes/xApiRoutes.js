const express = require('express');
const router = express.Router();

const { getRecentHealthClaims }= require('../controllers/xApiController');

router.get("/health-claims", getRecentHealthClaims);

module.exports = router;