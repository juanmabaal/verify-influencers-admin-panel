
const getAllInfluencers = require('../services/dataService');

const getInfluencers = (req, res) => {
    try {
        const influencers = getAllInfluencers();
        res.json(influencers);
    } catch (error) {
        console.error('Error fetching influencers: ', error.message);
        res.status(500).json({ error: 'Failed to fetch influencers'});
    }
};

const getInfluencerById = (req, res) => {
    const { id } = req.params;

    try {
        const influencers = getAllInfluencers();

        const influencer = influencers.find((inf) => inf.id === Number(id));

        if(!influencer) {
            return res.status(404).json({ error: 'Influencer not found' });
        }

        res.json(influencer);
    } catch (error) {
        console.error('Error fetching influencer: ', error.message);
        res.status(500).json({ error: 'Failed to fetch influencer' });
    }
};


module.exports =  {getInfluencers, getInfluencerById};