const { Client, Message, MessageEmbed } = require("discord.js");
const { getParsedHexValue } = require("hexadecimal_conversion");

module.exports = {
    name: "binary",
    aliases: ["bin"],
    /**
     * @param {Client} bot
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(bot, message, args) => {
        const query = args[1];
        if(!query) return message.channel.send("Please specify whatever you want to encode or decode");

        function encode(char) {
            return char.split("").map(str => {
                const coverted = str.charCodeAt(0).toString(2);
                return coverted.padStart(8, "0")
            }).join(" ");
        }

        function decode(char) {
            return char.split(" ").map(str => String.fromCharCode(Number.parseInt(str, 2))).join(" ");
        }
        function hexadecimal(char) {
            let dataType = "FLOAT";
            getParsedHexValue(char, dataType);
        }

        if(query === "encode") {
            const word = args.slice(2).join(" ");
            if(!word) return message.channel.send("Please specify a word to encode...");
            if(word.length > 1024) message.channel.send("oww, that is way too much, The maximum character was 1,024.");

            const embed = new MessageEmbed()
            .setAuthor("binary encode")
            // .setDescription(encode(word))
            .addField(`📥INPUT:\n\n${word}`, `📤OUTPUT:\n\n**${encode(word)}**`)
            .setColor("GOLD")
            .setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();
            message.channel.send(embed);
        }
        if(query === "decode") {
            const word = args.slice(2).join(" ");
            if(!word) return message.channel.send("Please specify a word to decode...");
            if(word.length > 1024) message.channel.send("oww, that is way too much, The maximum character was 1,024.");

            const embed = new MessageEmbed()
            .setAuthor("binary encode")
            .addField(`📥INPUT:\n\n${word}`, `📤OUTPUT:\n\n**${decode(word)}**`)
            .setColor("BLUE")
            .setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();
            message.channel.send(embed);
        } else message.channel.send("that option isnt valid!");
        // if(query === "hexadecimal") {
        //     const word = args.slice(2).join(" ");
        //     if(!word) return message.channel.send("Please specify a word to hexadecimal...");
        //     if(word.length > 1024) message.channel.send("oww, that is way too much, The maximum character was 1,024.");

        //     const embed = new MessageEmbed()
        //     .setAuthor("binary hexadecimal")
        //     .addField(`📥INPUT:\n\n${word}`, `📤OUTPUT:\n\n**${hexadecimal(word)}**`)
        //     .setColor("BLUE")
        //     .setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        //     .setTimestamp();
        //     message.channel.send(embed);
        // } else message.channel.send("that option isnt valid!");
    }
}