require('dotenv').config();
const OpenAI = require('openai');


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Tu clave API desde el archivo .env
  });

const analyzeText = async (text) => {
    try {

        const response = await openai.chat.completions.create (
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' }, 
                    { role: 'user', content: text }, 
                  ],
                max_tokens: 100,
            },

        );
        const content = response.choices[0].message.content;

        return content;
        
    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            console.error('API Error:', error.status, error.message, error.code, error.type);
          } else {
            console.error('Unexpected Error:', error);
          }
          throw new Error('Failed to connect to OpenAI API');
    }
};

module.exports = analyzeText;

