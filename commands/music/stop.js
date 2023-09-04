const { Message, Client, MessageEmbed } = require("discord.js");
const skip = require("../../util/music.js");

module.exports = {
  name: "stop",
  aliases: [],
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
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
    message.channel.send("⏹️ Stop the music and leave the voice channel.");
  }
}