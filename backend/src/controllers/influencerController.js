const getInfluencers = (req, res) => {
    res.json([
        {id: 1, name: 'Influencer A', topic: 'Health'},
        {id: 2, name: 'Influencer B', topic: 'Fitness'},
    ]);
};

module.exports =  getInfluencers ;