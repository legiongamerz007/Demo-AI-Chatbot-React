const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) return res.status(400).json({ error: 'No message sent.' });

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }]
    });

    const reply = completion.data.choices[0].message.content.trim();
    res.json({ reply });
  } catch (err) {
    console.error(err.message);
    // fallback response
    res.json({ reply: "Sorry! (Demo Mode): I'm currently unavailable. Try again later." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
