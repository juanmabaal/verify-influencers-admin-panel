require('dotenv').config();

const axios = require("axios");

const BEARER_TOKEN = process.env.BEARER_TOKEN;
// const token = 'AAAAAAAAAAAAAAAAAAAAAGLWyAEAAAAA2NHqhM4pOMmbYuPEj%2FeKr7DNQc4%3DGZRkI0lbkOkmbaqlynhawQvsDAn1MuVsLXyrnejsSQLUEMe2jS';
const BASE_URL = 'https://api.twitter.com/2/tweets/search/recent';

// // Servicio para buscar tweets recientes
 const fetchRecentTweets = async (query, maxResults = 10) => {
  try {
    console.log(`Fetching recent tweets with query: ${query} and max results: ${maxResults}`);

    const searchQuery = query.includes("is:verified") ? query : `${query} is:verified`;

    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      },
      params: {
        query: searchQuery,
        max_results: maxResults, 
        "tweet.fields": "created_at,author_id,public_metrics", 
        "expansions": "author_id,attachments.media_keys", 
        "user.fields": "name,username,profile_image_url,public_metrics", 
        "media.fields": "type,url",
      },
    });

    // Retornar los datos
    return response.data;
  } catch (error) {
    console.error("Error fetching tweets:", error.response?.data || error.message);
    throw new Error("Failed to fetch tweets from Twitter API");
  }
}

module.exports = { fetchRecentTweets };

//https://api.twitter.com/2/tweets/search/recent?query=health%20is:verified&max_results=30&tweet.fields=created_at,author_id,public_metrics&expansions=author_id,attachments.media_keys&user.fields=name,username,profile_image_url,public_metrics&media.fields=type,url
