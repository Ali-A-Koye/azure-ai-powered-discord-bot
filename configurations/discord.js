require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

bot.login(DISCORD_TOKEN);

module.exports = bot;
