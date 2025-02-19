import influencersMock from "../data/influencersMock";

const getInfluencers = async() => {

    try {
        
        return new Promise((resolve) => {
            setTimeout(() => resolve(influencersMock), 500);
        });
    } catch (error) {
        console.error("Errorfetching influencers");
        return [];
    }
}

export default { getInfluencers };