const winston = require("winston");
const fs = require("fs");
const path = require("path");

function setupLogger() {
  const logFolder = "logs";
  if (!fs.existsSync(logFolder)) {
    fs.mkdirSync(logFolder);
  }
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(), // Adds the timestamp as a property in the JSON
    winston.format.json() // Formats the log as JSON
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "logs", "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "logs", "combined.log"),
    }),
  ],
});

module.exports = { setupLogger, logger };
