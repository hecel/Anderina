const { Client, Message, MessageEmbed} = require("discord.js");
const schema = require("../../schema/blacklist");

module.exports = {
    name: "blacklist-member",
    aliases: ["blm"],
    /**
     * @param {Client} bot
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(bot, message, args) => {

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don't have permission to use this commands!");

        let type = args[1];

        if(!type) return message.channel.send("Please provide a type!");

        const getBlacklist = schema.findOne({ Guild: message.guild.id });
        if(type === "add") {
            let member = args[2];
            if(!member) return message.channel.send("Please provide a member!");
            schema.findOne({ Guild: message.guild.id, Users: member }, async(err, data) => {
                if(data) return message.channel.send("This user already in database before!");

                new schema({
                    Guild: message.guild.id,
                    Users: member
                }).save();
                message.channel.send("Blacklisted a new member");
            });
        } else if(type === "off") {
            let member = args[2];
            if(!member) return message.channel.send("Please provide a member!");

            schema.findOne({ Guild: message.guild.id, Users: member }, async(err, data) => {
                if(!data) return message.channel.send("That user id does exits in the database!");

                data.delete();
                message.channel.send("Removed blacklist from this guild.");
            });
        } else if(type === "remove") {
            let member = args[2];
            if(!member) return message.channel.send("Please provide a member!");

            schema.findOne({ Guild: message.guild.id, Users: member }, async(err, data) => {
                if(!data) return message.channel.send("That user id does exits in the database!");

                data.delete();
                message.channel.send("Removed blacklist from this guild.");
            });
        } else {
            message.channel.send(`Invalid type: **${query}**, Example: **add/remove/off**`);
        }
    }
}