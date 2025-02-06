require('dotenv').config();

const axios = require("axios");

const structureTweetData = (apiResponse) => {
  if (!apiResponse || !apiResponse.data || !apiResponse.includes) {
    return { success: false, message: "Invalid API response format" };
  }

  const { data: tweets, includes = {} } = apiResponse;
  const { users = [], media = [] } = includes;

  // Crear un mapa de usuarios para asociarlos con sus tweets
  const userMap = users.reduce((acc, user) => {
    acc[user.id] = {
      id: user.id,
      name: user.name,
      username: user.username,
      profile_image_url: user.profile_image_url,
      followers_count: user.public_metrics?.followers_count || 0,
      following_count: user.public_metrics?.following_count || 0,
      tweets: [],
      claims: [],
    };
    return acc;
  }, {});

  // Crear un mapa de medios para vincular con los tweets
  const mediaMap = media.reduce((acc, mediaItem) => {
    acc[mediaItem.media_key] = mediaItem.url || null;
    return acc;
  }, {});

  // Asociar los tweets con su respectivo usuario
  tweets.forEach((tweet) => {
    const user = userMap[tweet.author_id];
    if (user) {
      user.tweets.push({
        id: tweet.id,
        text: tweet.text,
        created_at: tweet.created_at,
        metrics: {
          retweets: tweet.public_metrics?.retweet_count || 0,
          likes: tweet.public_metrics?.like_count || 0,
          replies: tweet.public_metrics?.reply_count || 0,
          quotes: tweet.public_metrics?.quote_count || 0,
        },
        media: tweet.attachments?.media_keys?.map((key) => mediaMap[key]) || [],
      });
    }
  });

  return Object.values(userMap);
};


const BEARER_TOKEN = process.env.BEARER_TOKEN;
const BASE_URL = 'https://api.twitter.com/2/tweets/search/recent';


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

    const structuredData = structureTweetData(response.data);

    return structuredData;
    
    // return response.data;
  } catch (error) {
    console.error("Error fetching tweets:", error.response?.data || error.message);
    throw new Error("Failed to fetch tweets from Twitter API");
  }
}

module.exports = { fetchRecentTweets, structureTweetData };

//https://api.twitter.com/2/tweets/search/recent?query=health%20is:verified&max_results=30&tweet.fields=created_at,author_id,public_metrics&expansions=author_id,attachments.media_keys&user.fields=name,username,profile_image_url,public_metrics&media.fields=type,url
