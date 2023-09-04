const { MessageEmbed } = require("discord.js");
  
module.exports = {
  name: "purge",
  aliases: ["pur"],
  descrption: "clear a message",
  usage: "N!purge <size>",
  run: async(bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send({embed: {color: "RED", description: "You can't use this command!"}}).then(m => {
          m.delete({ timeout: 4000});
        });
      }
      let input = args.slice(1).join(" ");
      let masuk = args.slice(2).join(" ");
      let ch = message.mentions.channels.first();
      if(!input) return message.channel.send("Please specify a valid number!");
      try {
        if(!ch) {
      await message.delete();
      await message.channel.bulkDelete(input)
        .then(messages => message.channel.send(`Succes clear the message! ${messages.size}/${input}`)).then(m => {
        m.delete({
          timeout: 4000
        });
      });
     } else {
       await message.delete();
       await ch.bulkDelete(masuk)
       .then(messages => message.channel.send(`Succes clear the message! ${messages.size}/${input}`)).then(m => {
         m.delete({
           timeout: 4000
         });
       });
     }
    } catch (e) {
      const embed = new MessageEmbed()
      .setColor("RED")
      .setTitle(":x: Error!")
      .setDescription(e)
      .setTimestamp()
      .setFooter("script by: Wolfrad Muara Saputra#0371\n")
     message.channel.send(embed);
    }
  }
}