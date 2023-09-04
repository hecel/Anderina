const { Client, Message, MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "tempban",
    aliases: ["tb"],
    /**
     * @param {Client} bot
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You dont have permission to run this command!");

        const member = message.guild.member(message.mentions.users.first());
        const time = ms(args[2]);
        let rs = args.slice(3).join(" ");

        if(!member) return message.channel.send("Please specify a member");
       if(!time) return message.channel.send("Please insert a time!");
      
        if(!rs) rs = "No reason provied.";
        if(member === `<@${bot.user.id}>`) return message.member.send("You can't banned me!");

        member.ban({ reason: rs });

        message.channel.send(`Successfully tempban ${member} with reason: **${rs}**`);
        member.send(`You has been tempban for reason: ${rs} with time: ${time}`).catch((err) => {
            message.channel.send("I Can't dm this user...");
      });
      setTimeout(() => {
        message.guild.fetchBans().then(ban => {
          let banUser = ban.find(bans => bans.user.id === member.id);
          message.guild.members.unban(banUser.user);
          message.channel.send(`Successfully unbaned ${member}`);
        });
      }, time);
  }
}