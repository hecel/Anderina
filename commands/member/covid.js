const Discord = require("discord.js")
const api = require("novelcovid");
const bot = new Discord.Client();
const { MessageButton } = require("discord-buttons");

module.exports = {
  name: "covid",
  description: "GET THE STATUS OF COUNTRY COVID",
  usage: "corona all or corona <country>",
  aliases: ["cvd"],
  run: async (bot, message, args) => {
    
    api.settings({
        baseUrl: 'https://disease.sh'
    });
    let input = args.slice(1).join(" ");
    if(!input) {
      
      const corona = await api.all();
      console.log(corona);
      
      let embed = new Discord.MessageEmbed()
      .setTitle("Global Cases")
      .setColor("#ff2050")
      .setDescription("**SOMETIME CASES MAY DIFFER**")
      .addField("Total Cases", corona.cases, true)
      .addField("Total Deaths", corona.deaths, true)
      .addField("Total Recovered", corona.recovered, true)
      .addField("Today's Cases", corona.todayCases, true)
      .addField("Today's Deaths", corona.todayDeaths, true)
      .addField("Active Cases", corona.active, true)
      .setTimestamp();
      return message.channel.send(embed);
      
    } else {

      let corona = await api.countries({country: args.slice(1).join(" ")}) 
      if(corona == null) return message.channel.send("Couldn't find data about this country")
      let embed = new Discord.MessageEmbed()
      .setTitle(`${corona.country}`)
      .setColor("#ff2050")
      .setDescription("SOMETIME CASES MAY DIFFER")
      .setThumbnail(corona.countryInfo.flag)
      .addField("Total Cases", corona.cases, true)
      .addField("Total Deaths", corona.deaths, true)
      .addField("Total Recovered", corona.recovered, true)
      .addField("Today's Cases", corona.todayCases, true)
      .addField("Today's Deaths", corona.todayDeaths, true)
      .addField("Active Cases", corona.active, true)
      .setTimestamp();
      return message.channel.send(embed);
    }    
  }
}