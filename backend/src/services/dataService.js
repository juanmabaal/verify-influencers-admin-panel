const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/influencers.json');

const getAllInfluencers = () => {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
};

const getInfluencerById = (id) => {
    const data = getAllInfluencers();
    return data.find((influencer) => influencer.id === id);
};

const updateInfluencers = (newData) => {
    fs.writeFileSync(dataPath, JSON.stringify(newData, null, 2), 'utf-8');
};

module.exports = getAllInfluencers, getInfluencerById, updateInfluencers;
