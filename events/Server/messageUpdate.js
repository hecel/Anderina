const { MessageEmbed } = require("discord.js");
const bot = require("../../index");

bot.on("messageUpdate", async (message, oldMessage) => {
  
  const snipes = bot.edits.get(message.channel.id) || [];
  snipes.unshift({
    msg: message,
    image: message.attachments.first() ? message.attachments.first().proxyURL : null,
    time: Date.now()
  });
  bot.edits.set(message.channel.id, snipes);

  //ghost pings
  // if (oldMessage.mentions.users.first()) {
  //   let channel = bot.channels.cache.get("864049509306335243");

  //   if (!channel) return;

  //   const embed = new MessageEmbed()
  //     .setTitle("Message Update")
  //     .setColor("RED")
  //     .setDescription(`${oldMessage.author} ghost pings: ${oldMessage.mentions.users.first()}\nmessage ini dari: ${oldMessage.guild}`)
  //     .addField("Content:", message.content, true)
  //     .setTimestamp();
  //   return channel.send(embed);
  // }
});