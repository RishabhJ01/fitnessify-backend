const router=require("express").Router();
const axios = require('axios');

// API endpoint for creating a chat session
app.post('/chat/session', async (req, res) => {
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: 'You are a fitness and wellness assistant.' }],
      }, {
        headers: {
            'Authorization': 'Bearer YOUR_OPENAI_API_KEY',
          'Content-Type': 'application/json',
        },
      });
  
      res.json({ sessionId: response.data.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create chat session' });
    }
  });
  
  // API endpoint for sending user messages
  app.post('/chat/message', async (req, res) => {
    const { sessionId, message } = req.body;
  
    try {
      const response = await axios.post(`https://api.openai.com/v1/chat/completions/${sessionId}/messages`, {
        messages: [{ role: 'system', content: message }],
      }, {
        headers: {
          'Authorization': 'Bearer YOUR_OPENAI_API_KEY',
          'Content-Type': 'application/json',
        },
      });
  
      res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send user message' });
    }
  });
  
  // API endpoint for retrieving chat history
  app.get('/chat/history/:sessionId', async (req, res) => {
    const sessionId = req.params.sessionId;
  
    try {
      const response = await axios.get(`https://api.openai.com/v1/chat/completions/${sessionId}`, {
        headers: {
          'Authorization': 'Bearer YOUR_OPENAI_API_KEY',
        },
      });
  
      res.json({ history: response.data.messages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve chat history' });
    }
  });
  
  // API endpoint for generating suggested responses
  app.post('/chat/suggestions', async (req, res) => {
    const { sessionId } = req.body;
  
    try {
      const response = await axios.post(`https://api.openai.com/v1/chat/completions/${sessionId}/messages`, {
        messages: [{ role: 'system', content: 'Suggest' }],
      }, {
        headers: {
            'Authorization': 'Bearer YOUR_OPENAI_API_KEY',
          'Content-Type': 'application/json',
        },
      });
  
      const suggestions = response.data.choices.map(choice => choice.message.content);
      res.json({ suggestions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to generate suggestions' });
    }
  });
  
  
  app.get("/response",(req,res)=>{
    // const {message} =req.body
    var message='hello how are you ?'
    var resp=generateChatMessage(message)
    res.status(200).json({resp})
  })
  async function generateChatMessage(prompt) {
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: 'You are a fitness and wellness assistant.' }, { role: 'user', content: prompt }],
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_OPENAI_API_KEY',
        },
      });
  
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Failed to generate chat message:', error);
      throw error;
    }
  }