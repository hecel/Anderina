const { Collection } = require("discord.js");
const bot = require("../../index");
const voiceCollection = new Collection();

bot.on("voiceStateUpdate", async(oldState, newState) => {
    const user = await bot.users.fetch(newState.id);
    const member = newState.guild.member(user);

    if(!oldState.channel && newState.channel.id === "864048799286951940") {
        const channel = await newState.guild.channels.create(user.tag, {
            type: "voice", 
            parent: newState.channel.parent
        });
        member.voice.setChannel(channel);
        voiceCollection.set(user.id, channel.id);
    } else if(!newState.channel) {
        if(oldState.channelID === voiceCollection.get(newState.id)) return oldState.channel.delete();
  }
});

bot.on("voiceStateUpdate", async(oldStates, newStates) => {
    const user = await bot.users.fetch(newStates.id);
    const member = newStates.guild.member(user);

    if(!oldStates.channel && newStates.channel.id === "921672557915164682") {
        const channel = await newStates.guild.channels.create(user.tag, {
            type: "voice", 
            parent: newStates.channel.parent
        });
        member.voice.setChannel(channel);
        voiceCollection.set(user.id, channel.id);
    } else if(!newStates.channel) {
        if(oldStates.channelID === voiceCollection.get(newStates.id)) return oldStates.channel.delete();
  }
});