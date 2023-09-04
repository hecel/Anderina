const { Client, Message, MessageEmbed} = require("discord.js");
const schema = require("../../schema/blacklist-words");

module.exports = {
    name: "blacklist-word",
    aliases: ["blw"],
    // private: true,
    /**
     * @param {Client} bot
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(bot, message, args) => {
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don't have permission to use this command!");
      
      const choice = args[1];
      if(!choice) return;

      if(choice === "add") {
        const word = args.slice(2).join(" ");
        if(!word) return message.channel.send("Please input the words!");

        schema.findOne({ Guild: message.guild.id, Word: word }, async(err, data) => {
          if(data) return message.channel.send("This word already in database before!");

          new schema({
            Guild: message.guild.id,
            Word: word
          }).save();
          message.channel.send("Sucessfully saved the database!");
        });
      }

      if(choice === "remove") {
        const word = args.slice(2).join(" ");
        if(!word) return message.channel.send("Please input the words!");

        schema.findOne({ Guild: message.guild.id, Word: word }, async(err, data) => {
          if(!data) return message.channel.send("This word already not in database before!");

          data.delete();
          message.channel.send("Sucessfully removed from database!");
        });
      }
    }
  }