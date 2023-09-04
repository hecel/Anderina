var scrp = require("images-scraper");

const google = new scrp({
    puppeteer: {
        headless: true
    }
});

module.exports = {
    name: "image",
    aliases: ["img"],
    run: async(bot, message, args) => {
        const img_query = args.join(" ");
        if(!img_query) return message.channel.send("Please enter an img name...");

        const img_result = await google.scrape(img_query, 1);
        message.channel.send(img_result[0].url);
    }
}