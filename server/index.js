const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// ✅ Proper CORS to allow React frontend
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// ✅ Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// ✅ POST route
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) return res.status(400).json({ error: 'No message sent.' });

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }]
    });

    const reply = completion.choices[0].message.content.trim();
    res.json({ reply });
  } catch (err) {
    console.error('OpenAI error:', err.message);
    // fallback response
    res.json({ reply: "Sorry! (Demo Mode): I'm currently unavailable. Try again later." });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
