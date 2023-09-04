const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require("../../schema/globalChat");

module.exports = {
    name: 'globalremove',
    aliases: ["gbrem"],
    premium: true,
    description: 'remove the global chat',
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don't have permission to use this command");

        let ch = message.mentions.channels.first() || message.channel;
        const query = { Guild: message.guild.id, Channel: ch.id,  Activated: true };

        schema.findOne(query, async(err, data) => {
            if(data) {
                await schema.findOneAndDelete(query);
                return message.channel.send(`${ch} has been removed from internasional chat`);
            }
            message.channel.send(`${ch} is not listed as an internasional chat channel`);
        });
    }
}