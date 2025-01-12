const express = require('express');
const getInfluencers = require('../controllers/influencerController');
const router = express.Router();

router.get('/', getInfluencers);

module.exports = router;
