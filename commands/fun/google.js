const { Client, Message, MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
  name: "google",
  aliases: ["gle"],
  /**
   * @param {Client} bot
   * @param {Message} message
   * @param {String[]} args
   */
  run: async(bot, message, args) => {
    const query = args.slice(1).join(" ");
    if(!query) return message.lineReply("No query.");
    
    let result = await superagent.get("https://customsearch.googleapis.com/customsearch/v1").query({ q: query, cx: "4a722a2f61c56eb3d", key: "AIzaSyBbq4aOxPrpc0x8p0Tl9X2BUmoKwscmWiQ"});

    if(!result.body.items) return message.lineReply("Not Found.");
    if(result.status >= 400) return message.channel.send("Error.").then(console.log(result.message));

    let res = result.body.items[0];
    const embed = new MessageEmbed()
    .setColor(0x7289DA)
    .setTitle(res.title)
    .setDescription(res.snippet)
    .setURL(res.link)
    .setImage(res.pagemap.cse_image[0].src || res.pagemap.cse_thumbnail[0].src)
    .setThumbnail(res.pagemap.cse_image[0].src || res.pagemap.cse_thumbnail[0].src)
    .setTimestamp()
    .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
    return message.channel.send(embed);
  }
}