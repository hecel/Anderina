const bot = require('../../index');
const word = require("../../schema/blacklist-words");

bot.on("message", async(message) => {
    if(message.author.bot) return;
    
    const blw = await word.findOne({ Guild: message.guild.id });
    if(!blw) return;
    
    if(message.content.includes(blw.Word)) {
      if(message.content.includes("remove") || message.content.includes("add")) return;
      
        await message.delete();
        message.channel.send("This word has blacklisted by moderator/admin, please contact the moderator/admin to get this problem solved!").then(m => m.delete({ timeout: 10000}));
    }
});