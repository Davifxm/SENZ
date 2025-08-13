const functions = require("firebase-functions");
const fetch = require("node-fetch"); // npm install node-fetch@2

const GEMINI_API_KEY = "AIzaSyCIdFDZC67axQaYz5maRgpqD7AnamaUgiA";

exports.jarvis = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt vazio" });

    const apiUrl = "https://api.generativeai.google/v1beta2/models/gemini-2.5/instances:generateText";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GEMINI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        temperature: 0.7,
        maxOutputTokens: 500
      }),
    });

    const data = await response.json();
    const text = data?.candidates?.[0]?.content || "Não consegui responder. 😕";
    res.json({ text });

  } catch (err) {
    console.error(err);
    res.json({ text: "Não consegui responder. 😕" });
  }
});
