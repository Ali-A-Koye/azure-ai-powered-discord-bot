const azureClient = require("../configurations/azure");

module.exports = async (document) => {
  const results = await azureClient.analyzeSentiment(document);
  return results[0].confidenceScores;
};
