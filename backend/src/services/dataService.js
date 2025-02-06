const fs = require('fs');
const path = require('path');
const { structureTweetData } = require('./xApiService');

// const dataPath = path.join(__dirname, '../data/influencers.json');
const dataPath = path.join(__dirname, '../data/tweetsRoute.json');
const dbFile = path.join(__dirname, '../data/influencers.json');

const getRecentHealthClaims = () => {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return structureTweetData(JSON.parse(data));
};


const getInfluencerByIdFromData = (id) => {
    const data = getRecentHealthClaims();
    return data.find((influencer) => influencer.id === id);
};

const updateInfluencers = (newData) => {
    fs.writeFileSync(dbFile, JSON.stringify(newData, null, 2), 'utf-8');
};

const isFileEmpty = (file) => {
    try {
        const stats = fs.statSync(file);
        return stats.size === 0; // Devuelve true si el archivo está vacío
    } catch (error) {
        console.error("Error verificando el archivo:", error.message);
        return true;
    }
};

const getStructuredInfluencers = () => {
    
   if(isFileEmpty(dbFile)) {
    const newData = getRecentHealthClaims(); 
    updateInfluencers(newData);
   };
   const data = fs.readFileSync(dbFile, 'utf-8');

   return JSON.parse(data);

}

module.exports =  { getStructuredInfluencers, getRecentHealthClaims, getInfluencerByIdFromData, updateInfluencers };
