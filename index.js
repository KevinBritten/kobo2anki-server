const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const deepl = require("deepl-node");

const app = express();
const PORT = process.env.PORT || 3000;

const DEV_PASSWORD = process.env.DEV_PASSWORD;
const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const translator = new deepl.Translator(DEEPL_API_KEY);

app.use(bodyParser.json());

app.post("/translate", async (req, res) => {
  const { text, context, source_lang, target_lang, password } = req.body;
  if (password != DEV_PASSWORD) {
    return res.status(401).json({ error: "Incorrect Password" });
  }
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const result = await translator.translateText(
      text,
      source_lang || null,
      target_lang || "EN-GB",
      { context }
    );
    res.json({ translations: result });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Translation failed", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
