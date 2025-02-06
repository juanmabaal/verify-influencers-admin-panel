
const { getStructuredInfluencers, getInfluencerByIdFromData, updateInfluencers } = require('../services/dataService');
const { fetchRecentTweets } = require('../services/xApiService');

const { generateHash } = require('../services/hashService');
const analyzeText = require('../services/apiService');

const getInfluencers = async (req, res) => {
    const { query= 'health', maxResults = 10} = req.query

    try {

        // const influencers = await fetchRecentTweets(query, maxResults);
        const influencers = getStructuredInfluencers();
        res.status(200).json(
            influencers,
          );

    } catch (error) {
        console.error('Error in getStructuredInfluencers: ', error.message);
        res.status(500).json({
            success: false,
            error: "Failed to fetch health claims tweets",
          });
    }
};

const getInfluencerById = (req, res) => {
    const { id } = req.params;

    try {

        const influencerById= getInfluencerByIdFromData(id);

        if(!influencerById) {
            return res.status(404).json({ error: 'Influencer not found' });
        }

        res.json(influencerById);
    } catch (error) {
        console.error('Error fetching influencer: ', error.message);
        res.status(500).json({ error: 'Failed to fetch influencer' });
    }
};

const analyzeClaimsInfluencers = async (req, res) => {
    const { id } = req.params;

    let influencers = getStructuredInfluencers();

    let influencerIndex = influencers.findIndex((inf) => inf.id === id);
    
    if (influencerIndex === -1) {
        return res.status(404).json({ error: 'Influencer not found' });
    }

    let influencer = influencers[influencerIndex];

    try {
        const existingHashes = influencer.claims.map((claim) => claim.hash);

        const newClaims = await Promise.all(
            influencer.tweets.map(async (tweet) => {
                try {
                    const analyzedClaim = await analyzeText(tweet.text);
                    const hash = generateHash(analyzedClaim.text);

                    if (!existingHashes.includes(hash)) {
                        return {
                            ...analyzedClaim,
                            hash,
                            created_at: new Date().toISOString(),
                        };
                    }
                } catch (error) {
                    console.error("Error analyzing post:", tweet.text, error.message);
                    return { text: tweet.text, verified: false, error: error.message };
                }
            })
        );

        const validClaims = newClaims.filter((claim) => claim);

        // Actualizar el objeto en el array principal
        influencers[influencerIndex].claims = [...influencer.claims, ...validClaims];

        updateInfluencers(influencers);

        res.json({ success: true, claims: influencers[influencerIndex].claims });

    } catch (error) {
        console.error('Error analyzing posts:', error.message);
        res.status(500).json({ error: 'Failed to analyze posts' });
    }
};



module.exports =  {getInfluencers, getInfluencerById, analyzeClaimsInfluencers};