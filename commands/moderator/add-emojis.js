const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'add-emoji',
    aliases: [],
    description: 'add emojis from other guilds',
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
       message.channel.startTyping(true);
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Sorry you don't have permission to use this command.").then(message.channel.stopTyping(true));

          const emoji = message.attachments.first() ? message.attachments.first().proxyURL : null;
          const name = args.slice(1).join(" ");
          if(!emoji) return message.channel.send("Please insert a image to add the emoji!").then(message.channel.stopTyping(true));
          if(!name) return message.channel.send("Please provide a valid name!").then(message.channel.stopTyping(true));

          await message.guild.emojis.create(emoji, name).then(emo => {
            const embed = new MessageEmbed()
            .setTitle("Succes!")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setColor("GREEN")
            .addField("Name:", name, true)
            .addField("ID:", emo.id, true)
            .setTimestamp();

            message.channel.stopTyping(true);
            message.channel.send(embed);
          }).catch(err => {
            message.channel.stopTyping(true);
            message.channel.send("UPS, SOMETHING WHEN WRONG!");
            throw err;
          });
    }
}