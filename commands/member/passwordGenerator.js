const { MessageEmbed } = require("discord.js");
const length = ["4", "8", "12", "16"];
const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";

module.exports = {
    name: "passwordGenerator",
    aliases: ["passgen"],
    description: "generate random password",
    run: async(bot, message, args) => {
        
        let pass = "";
        let ranlength = length[Math.floor(Math.random() * length.length)];

        // function PasswordGenerate() {
        //     // let pass = "";
        //     for(var i = 0; i < length; i++) {
        //         let ran = Math.floor(Math.random() * char.length);
        //         pass += char.substring(ran, ran + 1)
        //     }
        // }
        for(var i = 0; i < ranlength; i++) {
            let ran = Math.floor(Math.random() * char.length);
            pass += char.substring(ran, ran + 1);
        }
        // message.channel.send(pass);
        const embed = new MessageEmbed()
        .setTitle("password generator")
        .setDescription("Generate Random Password, length: " + ranlength)
        .addField("Random Password: ", pass)
        .setColor("GOLD")
        .setTimestamp()
        .setFooter(`requested by: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }));
        message.channel.send(embed);
    }
}