import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' });

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  const lower = message?.toLowerCase() || '';
  const localReplies = {
    harga: 'Harga layanan kami mulai dari Rp7.000 per kg.',
    layanan: 'Kami menyediakan layanan cuci kering, setrika, dan antar-jemput.',
    lokasi: 'Laundry Casey berada di Jl. Bersih No. 88, Bandung.',
    waktu: 'Proses standar 1-2 hari kerja, ekspres bisa 12 jam.',
  };

  for (const key in localReplies) {
    if (lower.includes(key)) {
      return res.json({ reply: localReplies[key] });
    }
  }

  if (!message) {
    return res.status(400).json({ error: 'Prompt tidak boleh kosong.' });
  }

  try {
    const result = await model.generateContent([message]);
    const response = result.response;
    let replyText = response.text();

    // Hapus karakter *#
  replyText = replyText.replace(/[*#]/g, '');

    return res.json({ reply: replyText });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
