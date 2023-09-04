const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "unban",
    aliases: ["ub"],
    /**
     * @param {Client} bot
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(bot, message, args) => {
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don't have permission to use this command!");
      if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I do not have permission to run this command.");

      let userID = args[1];
      let reason = args.slice(2).join(" ");
      if(!userID) return message.channel.send("Please state an ID to unban user.");
      if(!reason) reason = "No reason";
      if(userID === message.author.id) return message.channel.send("You cannot unban yourself.");

      let bans = await message.guild.fetchBans();
      if(bans.has(userID)) {
        message.guild.members.unban(userID);
        message.channel.send("Successfully unbanaed the user!");
      } else {
        message.channel.send("Provided ID is invalid or isn't banned.");
      }
    }
}