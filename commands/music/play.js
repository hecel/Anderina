const video_player = require("../../util/music.js");
const { Message, Client, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const { YT_API, DEVAULT_VOLUME, STAY_TIME } = require("../../botconfig/config.json");
const YouTubeAPI = require("simple-youtube-api");
const { query } = require("express");
const YouTube = new YouTubeAPI(YT_API);

module.exports = {
  name: "play",
  aliases: ["p"],
  discontinue: false,
  /**
  * @param {Message} message
  * @param {Client} bot
  * @param {String[]} args
  */
  run: async(bot, message, args) => {
    const search = args.join(" ");
    
    const server_queue = bot.queue.get(message.guild.id);
    const member = message.member.voice.channel;
            if(!member) return message.channel.send("You must be in a voice channel to play the music!");

            if(!search) return message.channel.send("Please provide a link!");

            // let result = await YouTube.searchVideos(search, 1, { part: "id" });
            let song = {};
        //     if(ytdl.validateURL(search)) {
        //         // const song_info = await ytdl.getInfo(link);
        //         const song_info = await ytdl.getInfo(search);
              
        //         song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url, thumbnail: song_info.videoDetails.thumbnail, duration: song_info.videoDetails.duration };
        //     } else {
        //         const video_finder = async(query) => {
        //         const videoResult = await ytSearch(query);
        //         return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        //     }
        //     const video = await video_finder(search);
        //     if(video) {
        //         song = { title: video.title, url: video.url, thumbnail: video.thumbnail, duration: video.duration };
        //     } else {
        //         message.channel.send("Error finding video.");
        //     }
        // }
        const validURL = (str) => {
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if(!regex.test(str)) {
                return false;
            } else {
                return true;
            }
        }

        if(validURL(args[1])) {
            message.channel.send("You entered the correct url.");

            const connection = await member.join();
            const stream = ytdl(args[1], { filter: "audioonly" });

            connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
                member.leave();
                message.channel.send("Leaving the voice channel...");
            });

            await message.channel.send("👌Now playing ***Your Link***");

            return
        }
        const video_finder = async(query) => {
            const videoResult = await ytSearch(query);
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await video_finder(search);
        if(video) {
            song = { title: video.title, url: video.url, thumbnail: video.thumbnail, duration: video.duration };
        } else {
            message.channel.send("Error finding the video...");
        }
        if(!server_queue) {
            const queue_constructor = {
                voice_channel: member,
                text_channel: message.channel,
                author: message,
                connection: null,
                songs: [],
                shuffle: false,
                loop: false,
                volume: DEVAULT_VOLUME,
                playing: true
            }

            bot.queue.set(message.guild.id, queue_constructor);
            queue_constructor.songs.push(song);

            try{
                const connection = await member.join();
                queue_constructor.connection = connection;
                queue_constructor.connection.voice.setSelfDeaf(true);
                video_player(message.guild, queue_constructor.songs[0]);
                console.log("success run the code.");
            } catch(err) {
                bot.queue.delete(message.guild.id);
                message.channel.send("There was error connecting.");
                member.leave();
                bot.queue.loop = false;
                throw err;
            }
        } else {
            // if (server_queue && server_queue.connection && server_queue.connection.dispatcher) {
            //     member.leave();
            //     message.channel.send("leave the voice channel...");
            // } else {
            //     server_queue.songs.push(song);
            //     const embed = new MessageEmbed()
            //     .setTitle("➕ Added to queue")
            //     .setColor("ffdd4d")
            //     .setDescription(`[${song.title}](${song.url})`)
            //     .setThumbnail(song.thumbnail);
            //     return message.channel.send(embed);
            // }
            server_queue.songs.push(song);
            const embed = new MessageEmbed()
            .setTitle("➕ Added to queue")
            .setColor("ffdd4d")
            .setDescription(`[${song.title}](${song.url})`)
            .setThumbnail(song.thumbnail);
            return message.channel.send(embed);
    }
  }
}