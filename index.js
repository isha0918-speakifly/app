// Deploy with the Firebase CLI (see README). This keeps your Anthropic
// API key on the server — it is never sent to the browser.
//
// Set your key once with:
//   firebase functions:config:set anthropic.key="YOUR_API_KEY"
// (or, on newer CLI versions, use a .env file with ANTHROPIC_API_KEY=...)

const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

const LEVEL_INSTRUCTIONS = {
  level0: "The student knows almost no English words. Use extremely simple vocabulary, short sentences (3-5 words), and speak slowly. Praise every attempt.",
  level1: "The student knows basic present-tense English. Use simple sentences, common words, and correct mistakes gently by repeating the correct form.",
  level2: "The student is at an elementary level. Use everyday vocabulary, past and future tense, and ask follow-up questions to keep them talking.",
  level3: "The student is intermediate. Use natural conversational English, introduce a few idioms, and gently challenge their opinions to encourage longer answers.",
  level4: "The student is upper-intermediate to advanced. Speak naturally, use idioms and varied tone, and have a genuinely free-flowing conversation."
};

exports.chatWithPartner = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { messages, level } = req.body;
      const apiKey = functions.config().anthropic.key;

      const systemPrompt =
        "You are a friendly, patient English speaking partner in a language-learning app. " +
        (LEVEL_INSTRUCTIONS[level] || LEVEL_INSTRUCTIONS.level0) +
        " Keep replies short (1-3 sentences) since the student will hear them read aloud. " +
        "Always end with a question or prompt that keeps the student speaking.";

      const anthropicMessages = messages.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content
      }));

      const apiResponse = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 300,
          system: systemPrompt,
          messages: anthropicMessages
        })
      });

      const data = await apiResponse.json();
      const reply = data.content && data.content[0] ? data.content[0].text : "Sorry, I didn't catch that. Can you say it again?";
      res.json({ reply });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong talking to the AI partner." });
    }
  });
});
