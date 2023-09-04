const Discord = require("discord.js");

module.exports = {
    name: "ping",
    aliases: [],
    run: async(bot, message, args) => {
        try {
            const m = await message.channel.send("testing the signal");
            setTimeout(() => {
              const embed = new Discord.MessageEmbed()
                .setColor("#FF8401")
                .setTitle(":ping_pong: PONG!")
                .addField("🏓 Api", `**${bot.ws.ping}ms!**`)
                .addField("⌛ Latency",`**${m.createdTimestamp - message.createdTimestamp}ms!**`)
                .setTimestamp()
                .setFooter("Scrip by: BlueWolf#0371\n");
              m.edit(`Successfully testing the signal`, embed);
            }, 4000);
          } catch (error) {
            return message.channel.send(error.message);
          }
    }
}