const bot = require("../../index");
const { MessageEmbed } = require("discord.js");
const schema = require("../../schema/globalChat");

bot.on("message", async(message) => {
    if(message.author.bot) return;
    schema.findOne({ Channel: message.channel.id, Activated: true }, async(err, data) => {
        if(data) {
            schema.find({ Activited: true }, async(err, data) => {
                data.map(({ Channel }) => {
                    if(Channel === message.channel.id) return;

                    const embed = new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(message.content)
                    .setColor("RANDOM")
                    .setImage(message.attachments.first() ? message.attachments.first().proxyURL : null)
                    .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
                    .setTimestamp();


                  bot.channels.cache.get(Channel).send(embed);

                });
            });
        }
    });
});