//buat test generate AI (route: /api/test/generate)

import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Route untuk testing AI Generate
router.post("/generate", async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash",
    });

    // Ambil prompt dari user
    const message = req.body.prompt || "buatkan teks acak untuk testing";

    // Tambahin konteks 
    const prompt = `
    Kamu adalah asisten AI yang menjawab dengan Bahasa Indonesia yang alami dan sopan.
    Tulis hasil yang singkat, jelas, dan mudah dibaca.

    Permintaan pengguna:
    ${message}
    `;

    const result = await model.generateContent([prompt]);
    let replyText = result.response.text();

    // Bersihkan karakter aneh 
    replyText = replyText
      .replace(/[*#]/g, "")
      .replace(/\n{2,}/g, "\n\n")
      .trim();

    return res.json({ reply: replyText });
  } catch (err) {
    console.error("Error saat generate:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
