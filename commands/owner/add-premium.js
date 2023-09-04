const { Client, Message, MessageEmbed } = require('discord.js');
const premium = require("../../schema/premium");
const { owner } = require("../../botconfig/config.json");
const day = require("dayjs");

module.exports = {
    name: "add-premium",
    aliases: [],
    description: 'add user to premium',
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
            // if(data) return message.channel.send("This user already gained to premium features");

            // new premium({ User: user.id }).save();
            // message.channel.send(`Added ${user.username} to premium features!`);
            if(data) data.delete();

            if(args[2]) {
                const time = day(args[2]).valueOf();
                
                new premium({
                    User: user,
                    Expire: time,
                    Permanent: false
                }).save();
            } else {
                new premium({
                    User: user,
                    Expire: 0,
                    Permanent: true
                }).save();
            }
            message.channel.send(`Added user to premium features!`);
        });
    }
}