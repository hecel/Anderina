const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "loop",
  aliases: ["lp"],
  discontinue: false,
  /**
  * @param {Message} message
  * @param {Client} bot
  * @param {String[]} args
  */
  run: async(bot, message, args) => {
    const server_queue = bot.queue.get(message.guild.id);
    
    if(!server_queue.voice_channel) return message.channel.send("You must be in the same voice channel!");
    if(!server_queue) return message.channel.send("There are no songs in queue.");

    if(bot.queue.loop) {
      bot.queue.loop = false;
      message.channel.send("🔁 Loop is now **off**");
    } else {
      bot.queue.loop = true;
      message.channel.send("🔁 Loop is now **on**");
    }
  }
}