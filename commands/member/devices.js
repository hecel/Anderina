const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'devices',
    aliases: [],
    description: 'Show Devices User',
    premium: true,
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        message.channel.startTyping(true);

        let user;
        if(message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else {
            user = message.author;
        }

        const devices = user.presence.clientStatus || {};
        const description = () => {
          const entries = Object.entries(devices).map((value, index) => `${index + 1}) ${value[0][0].toUpperCase()}${value[0].slice(1)}`).join("\n");
          return `Devices:\n${entries || "No Devices."}`;
        }
        const embed = new MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
        .setTitle("Show Device User")
        .setDescription(description())
        .addField("Devices logged in:", Object.entries(devices).length || "No Devices Are Logged.", true)
        .setColor("GOLD")
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();

        message.channel.stopTyping(true);
        message.channel.send(embed);
    }
}