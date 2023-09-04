const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "fetch-bans",
    aliases: ["bans"],
    description: "show all bans of members",
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Sorry you don't have permission to use this command");

        const fetchBans = message.guild.fetchBans();
        const bannedMembers = (await fetchBans).map((member) => `${member.user.tag} (${member.user.id})`).join("\n");
        const noMembers = bannedMembers ? bannedMembers : "No Members are ban!";

        message.channel.send("```" + noMembers + "```");
    }
}