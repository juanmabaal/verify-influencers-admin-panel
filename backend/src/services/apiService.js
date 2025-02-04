require('dotenv').config();
const OpenAI = require('openai');


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Tu clave API desde el archivo .env
  });



const analyzeText = async (text) => {
  try {
      const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
              { role: 'system', content: 'You are a health assistant. For each claim, provide the category (e.g., Nutrition, Medicine, Mental Health, Longevity, Neuroscience, Public Health, Genetics, Environmental Health, Alternative Therapies, Occupational Health, Rehabilitation, Pharmacology, Reproductive Health, Healthy Living, Sports and Health, Beauty, etc.), the verification status (Verified, Questionable, Debunked), and a trust score explicitly as "Trust Score: XX%".' },
              { role: 'user', content: text },
          ],
          max_tokens: 100,
      });

      const content = response.choices[0].message.content;

      // Manejo seguro de expresiones regulares
      const categoryMatch = content.match(/Category: (\w+)/i);
      const statusMatch = content.match(/(Verified|Questionable|Debunked)/i);
      const trustScoreMatch = content.match(/Trust Score: (\d+)%/i);

      return {
          text,
          category: categoryMatch ? categoryMatch[1] : 'Unknown',
          status: statusMatch ? statusMatch[0] : 'Unknown',
          trustScore: trustScoreMatch ? parseInt(trustScoreMatch[1]) : 0,
      };
  } catch (error) {
      console.error('Error connecting to OpenAI:', error.message);
      throw new Error('Failed to connect to OpenAI API');
  }
};


module.exports = analyzeText;

