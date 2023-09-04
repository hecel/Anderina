const Discord = require("discord.js");

module.exports = {
    name: "pp",
    aliases: [],
    run: async(bot , message, args) => {
        let user = message.mentions.users.first() || message.author;
        const num = Math.floor(Math.random() * 10) + 1;

        let str = "8";
        for(let i = 0; i < num; i++) {
          str += "=";
        }
        str += "D";

        const embed = new Discord.MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
        .setColor("RANDOM")
        .setTimestamp();

        if(user.username === message.author.username) {
          embed.addField("PP v2 Machine", `You are pp is ${str}`, true);
        } else {
          embed.addField("PP v2 Machine", `${user.username} pp is ${str}`, true);
        }
        message.channel.send(embed);
    }
}