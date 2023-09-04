const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "volune",
  aliases: ["vol"],
  discontinue: false,
  /**
  * @param {Message} message
  * @param {Client} bot
  * @param {String[]} args
  */
  run: async(bot, message, args) => {
    const server_queue = bot.queue.get(message.guild.id);
    
    if(!message.member.voice.channel) return message.channel.send("You must be in the same voice channel!");
        if(!server_queue) return message.channel.send("There are no songs in queue.");

        if(!args[1]) return message.channel.send(`The current volume is: ${queue.volume}`);
        if(isNaN(args[1])) return message.channel.send("Please use a number to set volume.");
        if(Number(args[1] > 100 || Number(args[1]) < 0)) return message.channel.send("Please use a number between 0 - 100");

        server_queue.connection.dispatcher.setVolumeLogarithmic(args[1] / 100);

        message.channel.send(`Volume set to: ${args[1]}`);
  }
}