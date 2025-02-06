require('dotenv').config();
const OpenAI = require('openai');
const {determineTopic} = require('./topicClassifier');


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Tu clave API desde el archivo .env
  });

  const validCategories = new Set([
    "Nutrition", "Medicine", "Mental Health", "Longevity", "Neuroscience", 
    "Public Health", "Genetics", "Sports andHealth", "Beauty", "Reproductive"
]);

const analyzeText = async (text) => {
  try {
      const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
              { role: 'system', content: 'You are a health assistant. For each claim, provide the category of the list in parentheses( Nutrition, Medicine, Mental_Health, Longevity, Neuroscience, Public_Health, Genetics, Environmental_Health, Alternative_Therapies, Occupational_Health, Rehabilitation, Pharmacology, Reproductive_Health, Healthy_Living, Sports_and_Health, Beauty), the verification status (Verified, Questionable, Debunked), and a trust score explicitly as "Trust Score: XX%".' },
              { role: 'user', content: text },
          ],
          max_tokens: 100,
      });

      const content = response.choices[0].message.content;

      // Manejo seguro de expresiones regulares
      const categoryMatch = content.match(/Category: (\w+)/i);
      const statusMatch = content.match(/(Verified|Questionable|Debunked)/i);
      const trustScoreMatch = content.match(/Trust Score: (\d+)%/i);

      // Usar OpenAI si proporciona categoría, si no, usar `determineTopic`
      const category = categoryMatch ? categoryMatch[1] : determineTopic(text);

      //category: categoryMatch ? categoryMatch[1] : 'Unknown',

      return {
          text,
          category,
          status: statusMatch ? statusMatch[0] : 'Unknown',
          trustScore: trustScoreMatch ? parseInt(trustScoreMatch[1]) : 0,
      };
  } catch (error) {
      console.error('Error connecting to OpenAI:', error.message);
      throw new Error('Failed to connect to OpenAI API');
  }
};


module.exports = analyzeText;

