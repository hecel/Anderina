const { owner } = require("../../botconfig/config.json");
const child = require("child_process");

module.exports = {
    name: "terminal",
    aliases: ["shell", "sudo"],
    run: async(bot, message, args) => {
        message.channel.startTyping(true);
        if(!owner.includes(message.author.id)) return message.channel.send('You Are Not My Developper.').then(m => {
          m.delete({ timeout: 4000 });
        });

        const command = args.slice(1).join(" ");
        if(!command) return message.channel.send("Please specify a command to execute!").then(message.channel.stopTyping(true));

        message.channel.stopTyping(true);
        child.exec(command, (err, res) => {
            if(err) {
                message.channel.send("UPS, FIND A SOME ERROR!");
                console.log(err);
            }
            message.channel.send(res.slice(0, 2000), { code: "js" });
        });
    }
}