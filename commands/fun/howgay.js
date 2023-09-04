const Discord = require("discord.js");

module.exports = {
    name: "howgay",
    aliases: [],
    run: async(bot, message, args) => {
        try {
            const user = message.mentions.users.first() || message.author;

            const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(`Requested by: ${message.author.tag}`);

            if(user.username === message.author.username) {
              embed.addField("Gay v2 Machine", `You are ${Math.floor(Math.random() * 100) + 0}% gay 🏳️‍🌈`, true);
            } else {
              embed.addField("Gay v2 Machine", `${user.username} is ${Math.floor(Math.random() * 100) + 0}% gay 🏳️‍🌈`, true);
            }
            message.channel.send(embed);
          } catch (error) {
            return message.channel.send(error.message);
          }
    }
}