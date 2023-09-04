module.exports = {
    name: "say",
    aliases: ["say"],
    run: async(bot, message, args) => {
        await message.delete();
        let kata = args.slice(1).join (" ");
        if(!kata) return message.channel.send("please specify the word");
        if(kata === "@everyone" || kata === "@here") return message.channel.send("You can't tag **everyone** and **here**");
        message.channel.send(kata);
    }
}