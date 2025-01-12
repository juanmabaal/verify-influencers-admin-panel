const express = require('express');

const getInfluencers = require('../controllers/influencerController');
const analyzeText = require('../services/apiService');


const router = express.Router();

router.get('/', getInfluencers);

router.post('/analyze', async (req,res) => {
    const { text } = req.body;

    if(!text) {
        return res.status(400).json({ error: 'Text is required'});
    }

    try {
        const result = await analyzeText(text);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
})

module.exports = router;
