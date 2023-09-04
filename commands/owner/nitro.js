const { Client, Message, MessageEmbed } = require("discord.js");
const randomstring = require("randomstring");
const { owner } = require("../../botconfig/config.json");
var start;

module.exports = {
  name: "nitro",
  aliases: ["gen"],
  /**
   * @param {Client} bot
   * @param {Message} message
   * @param {String[]} args
   */
  run: async(bot, message, args) => {
    if(!owner.includes(message.author.id)) return message.lineReply("Access denied.").then((m) => {
        m.delete({ timeout: 10000 });
    });

    let query = args[1];
    if(!query) return message.channel.send("Please specify a query, Example: start/stop");

    if(query === "start") {
        const st = await message.channel.send("Running the script...");
        start = setInterval(() => {
            message.channel.send("https://discord.gift/" + randomstring.generate(16));
        }, 6000);
        st.edit("Sucessfully running the script");
    }
    if(query === "stop") {
        const st = await message.channel.send("Stoping the script...");
        clearInterval(start);
        st.edit("Sucessfully stoping the script");
    }
    if(query === "gen") {
        message.channel.send("https://discord.gift/" + randomstring.generate(16));
    }
  }
}