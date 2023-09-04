const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const choice = ["◀️", "▶️"];

module.exports = {
  name: "editsnipe",
  aliases: ["esp"],
  run: async (bot, message, args) => {

    message.channel.startTyping(true);


    let snipes = bot.edits.get(message.channel.id);
    if (!snipes) return message.channel.send({ embed: { description: `There's nothing to edit snipe!`, color: "RED" }}).then((m) => { m.delete({ timeout: 4000 })});

    const snipe = +args[1] - 1 || 0;
    const target = snipes[snipe];
    
    if(!target) return message.channel.send({ embed: { description: `There is only ${snipes.length} messages!`, color: "RED" }}).then((m) => { m.delete({ timeout: 4000 })});

    const {msg, time, image} = target;
    
    const embed = new MessageEmbed()
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
      .setDescription(msg.content)
      .setColor("GOLD")
      .setImage(image)
      .setFooter(`${moment(time).fromNow()} | ${snipe + 1} / ${snipes.length}`);

    if(msg.content.includes("tenor.com") || msg.content.includes("media.discordapp.net")) {
      embed.setImage(msg.content);
    }

    message.channel.stopTyping(true);
    message.channel.send(embed); 
  }
}