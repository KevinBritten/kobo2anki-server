const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const deepl = require("deepl-node");

const { setupLogger, logger } = require("./logger.js");

const app = express();
const PORT = process.env.PORT || 3000;

const DEV_PASSWORD = process.env.DEV_PASSWORD;
const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const translator = new deepl.Translator(DEEPL_API_KEY);

app.use(bodyParser.json());

app.post("/translate", async (req, res) => {
  const { text, context, source_lang, target_lang, password } = req.body;
  if (password != DEV_PASSWORD) {
    const error = "Incorrect Password";
    logger.error(error);
    return res.status(401).json({ error });
  }
  if (!text) {
    const error = "Text is required";
    logger.error(error);
    return res.status(400).json({ error });
  }

  try {
    const usage = await translator.getUsage();
    const { count, limit } = usage.character;
    if (usage.anyLimitReached() || text.length > limit - count) {
      const error = "Monthly usage limit exceeded.";
      logger.error(error);
      return res.status(403).json({ error });
    }
    const result = await translator.translateText(
      text,
      source_lang || null,
      target_lang || "EN-GB",
      { context }
    );
    res.json({ translations: result });
  } catch (e) {
    const error = "Translation failed";
    logger.error(error);
    res.status(500).json({ error, details: e.message });
  }
});

setupLogger();

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
