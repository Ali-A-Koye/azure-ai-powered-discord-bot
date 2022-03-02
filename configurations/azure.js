require("dotenv").config();
const {
  TextAnalyticsClient,
  AzureKeyCredential,
} = require("@azure/ai-text-analytics");

const endpoint = process.env.AZURE_ENDPOINT;
const apiKey = process.env.AZURE_KEY;

let client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));
module.exports = client;
