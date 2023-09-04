const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "skip",
  aliases: ["s"],
  discontinue: false,
  /**
  * @param {Message} message
  * @param {Client} bot
  * @param {String[]} args
  */
  run: async(bot, message, args) => {

    const server_queue = await bot.queue.get(message.guild.id);
    
    if(!message.member.voice.channel) return message.channel.send("You must be in the same voice channel!");
    if(!server_queue) return message.channel.send("There are no songs in queue.");
    server_queue.connection.dispatcher.end();
    message.channel.send("⏭️ Skipped the song.");
  }
}