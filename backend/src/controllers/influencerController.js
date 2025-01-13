
const { getAllInfluencers, updateInfluencers } = require('../services/dataService');
const { generateHash } = require('../services/hashService');
const analyzeText = require('../services/apiService');

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

const analyzeClaimsInfluencers = async (req, res) => {
    const { id } = req.params;
    const influencers = getAllInfluencers();
    const influencer = influencers.find((inf) => inf.id === Number(id));
    // console.log("Processing influencer:", influencer);
    // console.log("Posts:", influencer.posts);

    if(!influencer) {
        return res.status(404).json({ error: 'Influencer not found' });
    }

    try {
        const existingHashes =influencer.claims.map((claim) => claim.hash);

        const newClaims = await Promise.all (
            influencer.posts.map( async (post) => {
                try {
                    const analyzeClaim = await analyzeText(post.text);
                    const hash = generateHash(analyzeClaim);

                    if(!existingHashes.includes(hash)) {

                        return { 
                            text: analyzeClaim, 
                            verified: false, 
                            hash,
                            created_at: new Date().toISOString(),
                         };
                    }
                } catch (error) {
                    console.error("Error analyzing post:", post.text, error.message);
                    return { text: post.text, verified: false, error: error.message }; // Maneja el error por post
                }
            })
        );
        
        const validClaims = newClaims.filter((claim) => claim);

        influencer.claims = [...influencer.claims, ...validClaims];
        console.log(" influencer:", influencer);//verificar el claim del influencer
        updateInfluencers(influencers);

        res.json( { success: true, claims: influencer.claims })
        
    } catch (error) {
        console.error('Error analyzing posts: ', error.message);
        res.status(500).json({ error: 'failed to analyze posts' })
    }
}


module.exports =  {getInfluencers, getInfluencerById, analyzeClaimsInfluencers};