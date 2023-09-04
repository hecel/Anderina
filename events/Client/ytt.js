const { DiscordTogether } = require("discord-together");
const bot = require("../../index");
const discordTogether = new DiscordTogether(bot);
module.exports = discordTogether;