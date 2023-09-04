const Discord = require("discord.js");
const bot = require("../../index");

bot.on("messageDelete", async(message, channel) => {
  
  const snipes = bot.snipes.get(message.channel.id) || [];
  snipes.unshift({
        msg: message,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null,
    time: Date.now()
  });
    bot.snipes.set(message.channel.id, snipes);

  //ghost pings
  // if(message.mentions.users.first()) {
  //   let channel = bot.channels.cache.get("864049509306335243");

  //   if(!channel) return;

  //   const embed = new Discord.MessageEmbed()
  //   .setTitle("Message Delete")
  //   .setColor("RED")
  //   .setDescription(`${message.author} ghost pings: ${message.mentions.users.first()}\nmessage ini dari: ${message.guild}`)
  //   .addField("Content:", message.content)
  //   .setTimestamp();
  //   return channel.send(embed);
  // }
});