const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const db = require("quick.db");

module.exports = {
    name: 'tags',
    aliases: ["tag"],
    description: 'idk what i say',
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
      const type = args[1];

      if(type === "add") {
        const tagName = args[2];
        if(!tagName) return message.channel.send("Please give a tags name!");
        const tagResponse = args[3];
        if(!tagResponse) return message.channel.send("Please give a tags response!");

        let database = await db.get(`tag.${message.guild.id}`);
         if(database && database.find(x => x.name === tagName.toLowerCase())) return message.channel.send("Tags already add!");

        let data = {
          name: tagName,
          response: tagResponse
        };

        db.push(`tag.${message.guild.id}`, data);
        return message.channel.send(`Added **${tagName.toLowerCase()}** to tags!`);
    } else if(type === "delete" || type === "remove") {
      const tagName = args[2];
      if(!tagName) return message.channel.send("Please give a tags name!");

      let database = await db.get(`tag.${message.guild.id}`);

      if(database) {
        let data = database.find(x => x.name === tagName.toLowerCase());
        if(!data) return message.channel.send("Tags not found!");

        let value = database.indexOf(data);
        delete database[value];

        var filter = database.filter(x => {
          return x != null && x != '';
        });

        db.set(`tag.${message.guild.id}`, filter);
        return message.channel.send(`Deleted **${tagName}** from tags!`);
    } else {
      return message.channel.send("Tags not found!");
    }
    } else if(!type) {
        
      let database = await db.get(`tag.${message.guild.id}`);
      if(!database) return message.channel.send("No tags found.");

      const embed = new MessageEmbed();
      if(database && database.length) {
        let array = [];
        database.forEach(x => {
          array.push(x.name);
        });
        embed
        .setColor("#00ff46")
        .setAuthor(`${array.length} Tags found!`)
        .setDescription("```" + `${array.join(", ")}` + "```")
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
      } return message.channel.send(embed);
    } else {
      let tagName = args[1];
      if(!tagName) return message.channel.send("Please provide a tags name!");

      let database = db.get(`tag.${message.guild.id}`);
      if(database) {
        let data = database.find(x => x.name === tagName.toLowerCase());
        // const attachments = new MessageAttachment(data.response, `${tagName}.png`);
        if(data) message.channel.send(data.response);
      }
    }
  }
}