require("dotenv").config();
const bot = require("../configurations/discord");
const analyzer = require("../src/analyzer");
const { MessageEmbed } = require("discord.js");

let document = "";
let previousMsgUserId = "";
let previousUser = {};
module.exports = () => {
  bot.on("ready", () => {
    console.info(`Logged in as ${bot.user.tag}!`);
  });

  bot.on("message", async (msg) => {
    if (msg.channel.id === process.env.SOURCE_CHANNEL) {
      if (previousMsgUserId == "") previousMsgUserId = msg.author.id;
      if (msg.author.id == previousMsgUserId) {
        document = document + " " + msg.content.trim();
        previousUser = msg.author;
      } else {
        if (document != "") {
          let result = await analyzer([document]);
          if (result.negative > 0.5) {
            const exampleEmbed = new MessageEmbed()
              .setColor("#FF0000")
              .setTitle(`Negativity Number ${result.negative} Detected`)
              .addFields(
                { name: "Message ", value: document },
                {
                  name: "Message By",
                  value: `${previousUser.username}#${previousUser.discriminator}`,
                  inline: true,
                }
              )
              .setTimestamp();

            bot.channels.cache
              .get(process.env.DESTINATION_CHANNEL)
              .send(exampleEmbed);
          }
        }
        document = "";
        previousMsgUserId = msg.author.id;
        previousUser = msg.author;
        document = document + " " + msg.content.trim();
      }
    }
  });
};
