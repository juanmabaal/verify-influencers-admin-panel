const { fetchRecentTweets } = require('../services/xApiService');

 const getRecentHealthClaims = async (req, res) => {
    const { query= 'health', maxResults = 10} = req.query
    try {
      console.log("Fetching tweets for query:", query);

      const tweetsData = await fetchRecentTweets(query, maxResults);

      // if(!tweetsData || !tweetsData.data || !tweetsData.data.length === 0) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "No tweets found for the given query",
      //   })
      // }
  
      res.status(200).json(
        tweetsData,
      );
      
    } catch (error) {
      console.error("Error in getRecentHealthClaims:", error.message);
      res.status(500).json({
        success: false,
        error: "Failed to fetch health claims tweets",
      });
    }
  };

  module.exports = { getRecentHealthClaims };