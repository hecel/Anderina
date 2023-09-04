const { MessageEmbed } = require("discord.js");
const bot = require("../../index");
const { prefix, developer, owner } = require("../../botconfig/config.json");
const prefixSchema = require("../../schema/PrefixSchema");
const server = require("../../schema/blacklist-servers");
const user = require("../../schema/blacklist-user");
const premiumSchema = require("../../schema/premium");
const { MessageButtonStyles } = require("discord-buttons");

bot.on("message", async(message) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") {
        const ch = bot.channels.cache.get("910458092750266379");
        if(!ch) return;
        
        const dmEmbed = new MessageEmbed()
        .setTitle("New dm!")
        .setColor("RANDOM")
        .setDescription(`User:\n${message.author}\n\nUser ID:\n${message.author.id}\n\nContent:\n${message.content}`)
        .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic : true }))
        .setTimestamp();
        ch.send(dmEmbed).then(message.author.send(`need help?, please contact ${developer} or type: N!help`));
    }

    let PREFIX;
    try {
        let data = await prefixSchema.findOne({ Guild: message.guild.id });
        if(!data) {
            PREFIX = prefix;
        } else {
            PREFIX = data.prefix;
        }
    } catch (err) {
        
    }
    if(message.content === `<@${bot.user.id}>` || message.content === `<@!${bot.user.id}>`) return message.channel.send(`${message.author} My prefix is ${PREFIX}`);
    if(!message.content.startsWith(PREFIX)) return;

    const args = message.content.split(" ");
    let command = message.content.toLowerCase().split(" ")[0];
    command = command.slice(PREFIX.length);
    message.prefix = PREFIX;

    let { cooldown } = require("../../cooldown");
    let cmdCooldown = cooldown;

    if(cmdCooldown.has(message.author.id)) {
        await message.delete();
        return message.channel.send("Hi, use the bot again within 5 seconds, then try again.").then(m => m.delete({ timeout: 5000 }));
    }
    cmdCooldown.add(message.author.id);

    setTimeout(() => {
        cmdCooldown.delete(message.author.id);
    }, 5000);
    
    const cmd = bot.commands.get(command) || bot.commands.find(cmds => cmds.aliases && cmds.aliases.includes(command));
    if(cmd) {
        if(cmd.premium) {
            premiumSchema.findOne({ User: message.author.id }, async(err, data) => {
                if(!data) return message.channel.send("This is a command premium!");
                if(data.Permanet && Date.now() > data.Expire) return message.channel.send("The premium system is expired.");

                const bl = await server.findOne({ Guild: message.guild.id });
                if(bl) return message.channel.send("This server has been blacklisted by the owner, please contact the owner to get this problem solved.");

                const usrbl = await user.findOne({ Users: message.author.id });
                if(usrbl) return message.channel.send("You has been blacklisted by the owner, please contact the owner to get this problem solved.");

                if(cmd.private && !owner.includes(message.author.id)) return message.channel.send("Sorry this command private.");
                if(cmd.discontinue) return message.channel.send("sorry this command has been discontinue by the developer, please contact the developer.");

                cmd.run(bot, message, args);
                console.log(`${message.author.tag} used command ${PREFIX}${command}`, `this message from: ${message.guild.name}`);
            });
        } else {
            const bl = await server.findOne({ Guild: message.guild.id });
            if(bl) return message.channel.send("This server has been blacklisted by the owner, please contact the owner to get this problem solved.");

            const usrbl = await user.findOne({ Users: message.author.id });
            if(usrbl) return message.channel.send("You has been blacklisted by the owner, please contact the owner to get this problem solved.");

            if(cmd.private && !owner.includes(message.author.id)) return message.channel.send("Sorry this command private.");
            if(cmd.discontinue) return message.channel.send("sorry this command has been discontinue by the developer, please contact the developer.");
            
            cmd.run(bot, message, args);
            console.log(`${message.author.tag} used command ${PREFIX}${command}`, `this message from: ${message.guild.name}`);
        }
    } else {
        message.channel.send("Error 404, command not found.").then(m => m.delete({ timeout: 4000 }));
    }

    message.flags = [];
    while(args[1] && args[1][1] === "-") {
        message.flags.push(args.shift().slice(0));
    }
    module.exports = message;
});
