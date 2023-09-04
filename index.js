const { Client, Collection } = require("discord.js");
const Discord = require("discord.js");
const { GiveawaysManager } = require("discord-giveaways");
require("discord-reply");
const bot = new Client({ disableEveryone: true, partials: ["MESSAGE", "REACTION"], ws: { properties: { $browser: "Discord Android" } }, restTimeOffset: 0 });
// const http = require("http");
// const express = require("express");
// const app = express();

const { TOKEN, developer } = require("./util/main");
const { Intents } = require("discord.js");
require("./util/keep_alive");

// app.get("/", (req, res) => {
//   console.log("ping");
//   res.sendStatus(200);
// });
// app.listen(2000);
// setInterval(() => {
//   http.get("http://github.com/@hecel/Nanda-AP")
// })

bot.on("warn", console.warn);
bot.on("error", console.error);

bot.snipes = new Collection();
bot.edits = new Collection();
bot.commands = new Collection();
bot.events = new Collection();
bot.aliases = new Collection();
bot.hatebin = new Collection();
bot.developers = developer;
bot.giveaways = new GiveawaysManager(bot, {
  storage: "./giveaways.json",
  updateCountdownEvery: 5000,
  embedColor: "GOLD",
  reaction: "🎉"
});
bot.antijoins = new Collection();
bot.antialts = new Collection();
bot.args = new Collection();
bot.blacklist = new Collection();
bot.queue = new Map();

module.exports = bot;

["module", "events"].forEach(handler => {
  require(`./handler/${handler}`)(bot, Discord);
});

require("./handler/mongoose");

bot.login(TOKEN);