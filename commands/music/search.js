const { Message, Client, MessageEmbed } = require("discord.js");
const { YT_API } = require("../../botconfig/config.json");
const YouTubeAPI = require("simple-youtube-api");
const YouTube = new YouTubeAPI(YT_API);

module.exports = {
  name: "search",
  aliases: ["sc"],
  discontinue: false,
  /**
  * @param {Message} message
  * @param {Client} bot
  * @param {String[]} args
  */
  run: async(bot, message, args) => {
    let search = args.join(" ");

  const resultsEmbed = new MessageEmbed()
  .setTitle(`**search video or music to set music**`)
  .setDescription(`please select to set music`, { search: search })
  .setColor("#F8AA2A");

  try {
      const results = await YouTube.searchVideos(search, 10);
      results.map((video, index) => resultsEmbed.addField(video.shortURL, `${index + 1}. ${video.title}`));

      let resultsMessage = await message.channel.send(resultsEmbed);

      function filter(msg) {
        const pattern = /^[1-9][0]?(\s*,\s*[1-9][0]?)*$/;
        return pattern.test(msg.content);
      }

      message.channel.activeCollector = true;
      const response = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] });
      const reply = response.first().content;

      if (reply.includes(",")) {
        let songs = reply.split(",").map((str) => str.trim());

        for (let song of songs) {
          await message.client.commands.get("play").run(message, [resultsEmbed.fields[parseInt(song) - 1].name]);
        }
      } else {
        const choice = resultsEmbed.fields[parseInt(response.first()) - 1].name;
        message.client.commands.get("play").run(message, [choice]);
      }

      message.channel.activeCollector = false;
      resultsMessage.delete().catch(console.error);
      response.first().delete().catch(console.error);
    } catch (error) {
      console.error(error);
      message.channel.activeCollector = false;
      message.reply(error.message).catch(console.error);
  }
  }
}