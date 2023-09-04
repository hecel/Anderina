const { Client, Message, MessageEmbed } = require('discord.js');
const premium = require("../../schema/premium");
const { owner } = require("../../botconfig/config.json");

module.exports = {
    name: "del-premium",
    aliases: [],
    description: 'delete user from premium',
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        if(!owner.includes(message.author.id)) return message.lineReply('You Are Not My Developper.').then(m => {
          m.delete({ timeout: 10000 });
        });

        let user;
        if(message.mentions.users.first()) {
          user = message.mentions.users.first().id;
        } else {
          user = bot.users.cache.get(args[1]) || message.author.id;
        }

        premium.findOne({ User: user }, async(err, data) => {
            if(!data) return message.channel.send("This user already removed from premium features");

            data.delete();
            message.channel.send(`Removed user from premium features!`);
        });
    }
}