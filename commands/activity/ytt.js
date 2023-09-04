const { Client, Message } = require("discord.js");
const discordTogether = require("../../events/Client/ytt");

module.exports = {
  name: "ytt",
  aliases: [],
  description: "Watch youtube in a voice channel",
  /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
  run: async(bot, message, args) => {
    const channelID = message.member.voice.channel;
    const ch = message.guild.channels.cache.get(channelID.id);

    // if(ch.type !== "GUILD_VOICE") return message.lineReply("Please choose a voice channel");

    discordTogether.createTogetherCode(channelID.id, "youtube").then(x => message.channel.send(x.code));
  }
}